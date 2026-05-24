import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  Plus,
  MoreVertical,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Eye,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';

// ─── API helpers ──────────────────────────────────────────────────────────────
const fetchRecruiterJobs    = () => api.get('/recruiter/jobs').then(r => r.data.data);
const fetchRecentApplicants = () => api.get('/recruiter/applicants?limit=5&page=1').then(r => r.data.data);
const fetchCompanyProfile   = () => api.get('/recruiter/profile').then(r => r.data.data);

// ─── Status badge helper ──────────────────────────────────────────────────────
const statusBadge = (status) => {
  const map = {
    PENDING:     'bg-gray-100 text-gray-500',
    REVIEWED:    'bg-yellow-50 text-yellow-600',
    INTERVIEW:   'bg-blue-50 text-blue-500',
    OFFERED:     'bg-purple-50 text-purple-600',
    HIRED:       'bg-green-50 text-green-600',
    REJECTED:    'bg-red-50 text-red-500',
  };
  return map[status] || 'bg-gray-100 text-gray-400';
};

const employmentLabel = (type) => {
  const map = {
    FULL_TIME: 'Full-time',
    PART_TIME: 'Part-time',
    CONTRACT: 'Contract',
    TEMPORARY: 'Temporary',
    INTERN: 'Internship',
    OTHER: 'Other',
  };
  return map[type] || type;
};

// ─── Component ────────────────────────────────────────────────────────────────
const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs]           = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [company, setCompany]     = useState(null);
  const [loading, setLoading]     = useState(true);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [jobsData, applicantsData, companyData] = await Promise.all([
          fetchRecruiterJobs(),
          fetchRecentApplicants().catch(() => ({ applicants: [] })),
          fetchCompanyProfile().catch(() => null),
        ]);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setApplicants(applicantsData?.applicants || []);
        setCompany(companyData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ─── Derived stats ───────────────────────────────────────────────────────────
  const totalApplicants = jobs.reduce((sum, j) => sum + (j._count?.applications || 0), 0);
  const interviews = applicants.filter(a => a.status === 'INTERVIEW').length;
  const hired      = applicants.filter(a => a.status === 'HIRED').length;

  const stats = [
    { label: 'Active Jobs',       value: jobs.length,      icon: Briefcase,    color: 'text-blue-500',   bg: 'bg-blue-50' },
    { label: 'Total Applicants',  value: totalApplicants,  icon: Users,        color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Interviews',        value: interviews,        icon: Clock,        color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Hired',             value: hired,             icon: CheckCircle2, color: 'text-green-500',  bg: 'bg-green-50' },
  ];

  // ─── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
      </div>
    );
  }

  const companyName = company?.name || 'Your Company';

  return (
    <div className="space-y-10">
      {/* Welcome & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {companyName} 👋
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your hiring process and company profile.</p>
        </div>
        <Link
          to="/dashboard/recruiter/post-job"
          className="flex items-center justify-center gap-2 bg-[#0052FF] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} />
          Post a New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Jobs List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Job Postings</h2>
            <Link to="/dashboard/recruiter/manage-jobs" className="text-[#0052FF] font-bold text-sm hover:underline">
              View all
            </Link>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center">
              <Briefcase size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No jobs posted yet.</p>
              <Link
                to="/dashboard/recruiter/post-job"
                className="mt-4 inline-flex items-center gap-2 text-[#0052FF] font-bold text-sm hover:underline"
              >
                <Plus size={16} /> Post your first job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.slice(0, 5).map((job) => {
                const postedDate = job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : '';
                return (
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0052FF] font-bold flex-shrink-0">
                          {(job.title || 'J')[0].toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">
                            <span>{employmentLabel(job.employmentType)}</span>
                            {postedDate && <><span>•</span><span>{postedDate}</span></>}
                            {job.location && <><span>•</span><span>{job.location}</span></>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center hidden sm:block">
                          <p className="text-lg font-bold text-gray-900">{job._count?.applications || 0}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Applicants</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg">
                            Active
                          </span>
                          <Link
                            to={`/dashboard/recruiter/jobs/${job.id}/applicants`}
                            className="p-2 text-gray-300 hover:text-[#0052FF] transition-colors"
                            title="View applicants"
                          >
                            <Eye size={18} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">New Applicants</h2>
            <Link to="/dashboard/recruiter/applicants" className="text-[#0052FF] font-bold text-sm hover:underline">
              View all
            </Link>
          </div>
          <div className="bg-white rounded-[2rem] border border-gray-100 p-2 overflow-hidden shadow-sm">
            {applicants.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm font-medium">
                No applicants yet.
              </div>
            ) : (
              applicants.slice(0, 5).map((app) => {
                const details   = app.user?.userDetails;
                const firstName = details?.firstName || '';
                const lastName  = details?.lastName || '';
                const fullName  = [firstName, lastName].filter(Boolean).join(' ') || app.user?.email || 'Applicant';
                const initials  = fullName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
                const jobTitle  = app.job?.title || '';

                return (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group"
                    onClick={() => navigate(`/dashboard/recruiter/jobs/${app.jobId}/applicants`)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold text-sm flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <p className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors truncate">
                        {fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{jobTitle}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${statusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Hire faster widget */}
          <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <h3 className="text-xl font-bold mb-3 relative z-10">Hire faster with Premium</h3>
            <p className="text-gray-400 text-sm mb-6 relative z-10">
              Unlock advanced filtering and unlimited job postings.
            </p>
            <button className="w-full py-3.5 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all relative z-10">
              Go Premium
            </button>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
