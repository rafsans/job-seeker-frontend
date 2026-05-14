import React from 'react';
import { 
  Briefcase, 
  Users, 
  Clock, 
  TrendingUp, 
  Plus, 
  MoreVertical, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruiterDashboard: React.FC = () => {
  const stats = [
    { label: 'Active Jobs', value: '08', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Applicants', value: '342', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Interviews', value: '12', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Hired', value: '04', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  const recentJobs = [
    { id: 1, title: 'Senior Product Designer', applicants: 45, type: 'Full-time', status: 'Active', posted: '2 days ago' },
    { id: 2, title: 'Cloud Solutions Architect', applicants: 28, type: 'Full-time', status: 'Active', posted: '5 days ago' },
    { id: 3, title: 'Software Engineer (L4)', applicants: 124, type: 'Remote', status: 'Active', posted: '1 week ago' },
  ];

  const recentApplicants = [
    { name: 'Alex Johnson', role: 'Senior Product Designer', status: 'Interviewing', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Sarah Williams', role: 'Cloud Solutions Architect', status: 'Pending', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { name: 'Michael Chen', role: 'Software Engineer', status: 'Shortlisted', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Dashboard 👋</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your hiring process and company profile.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#0052FF] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
          <Plus size={20} />
          Post a New Job
        </button>
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
            <Link to="/dashboard/recruiter/manage-jobs" className="text-[#0052FF] font-bold text-sm hover:underline">View all</Link>
          </div>
          
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0052FF] font-bold">
                      {job.title[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center hidden sm:block">
                      <p className="text-lg font-bold text-gray-900">{job.applicants}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Applicants</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg">
                        {job.status}
                      </span>
                      <button className="p-2 text-gray-300 hover:text-gray-900">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applicants Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">New Applicants</h2>
            <button className="text-[#0052FF] font-bold text-sm hover:underline">View all</button>
          </div>
          <div className="bg-white rounded-[2rem] border border-gray-100 p-2 overflow-hidden shadow-sm">
            {recentApplicants.map((applicant, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group">
                <img src={applicant.photo} alt={applicant.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-grow overflow-hidden">
                  <p className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors truncate">{applicant.name}</p>
                  <p className="text-xs text-gray-500 truncate">{applicant.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    applicant.status === 'Interviewing' ? 'bg-blue-50 text-blue-500' : 
                    applicant.status === 'Shortlisted' ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {applicant.status}
                  </span>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {/* Hire faster widget */}
          <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <h3 className="text-xl font-bold mb-3 relative z-10">Hire faster with Premium</h3>
            <p className="text-gray-400 text-sm mb-6 relative z-10">Unlock advanced filtering and unlimited job postings.</p>
            <button className="w-full py-3.5 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all relative z-10">
              Go Premium
            </button>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
