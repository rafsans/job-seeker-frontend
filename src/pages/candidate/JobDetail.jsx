import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  ChevronLeft, 
  Bookmark, 
  Share2, 
  Globe, 
  Users,
  CheckCircle2,
  Building2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getJobById, applyJob, saveJob, getMyApplications, getSavedJobs } from '../../api/jobs';

const formatDate = (dateString) => {
  if (!dateString) return 'Recent';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatIDR = (amount) => {
  if (!amount) return null;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

const normalizeJobType = (type) => {
  if (!type) return '';
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const [res, appsRes, savedRes] = await Promise.all([
          getJobById(id),
          getMyApplications().catch(() => ({ data: [] })),
          getSavedJobs().catch(() => ({ data: [] }))
        ]);
        
        if (res.data) {
          setJob(res.data);
          const applied = appsRes.data?.some(app => app.jobId === parseInt(id));
          setHasApplied(applied);
          
          const saved = savedRes.data?.some(savedJob => savedJob.jobId === parseInt(id));
          setIsSaved(saved);
        } else {
          setError('Job details not found.');
        }
      } catch (err) {
        console.error('Failed to fetch job detail:', err);
        setError('Failed to fetch job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!job) return;
    try {
      setApplying(true);
      await applyJob({ jobId: parseInt(id), coverLetter: '', resumeUrl: '' });
      toast.success('Successfully applied to this job!');
      setHasApplied(true);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to apply. You might have already applied.');
    } finally {
      setApplying(false);
    }
  };

  const handleSave = async () => {
    if (!job) return;
    try {
      setSaving(true);
      await saveJob({ jobId: parseInt(id) });
      setIsSaved(true);
      toast.success('Job saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save job. It may already be saved.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center py-16 bg-white border border-gray-100 rounded-[2.5rem]">
        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
        <p className="text-gray-600 font-bold text-lg">{error || 'Job not found'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#0052FF] font-bold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  // Parse arrays (assuming requirements, responsibilities, benefits might be stored as newlines or JSON strings if the backend schema is different. For now let's just split by newline if it's a string)
  const parseList = (text) => {
    if (!text) return [];
    if (Array.isArray(text)) {
      return text.map(i => typeof i === 'string' ? i : i.item).filter(i => i);
    }
    return text.split('\n').filter(item => item.trim() !== '');
  };

  const responsibilities = parseList(job.responsibilities);
  const requirements = parseList(job.requirements);
  const benefits = parseList(job.benefits);
  const companyName = job.company?.name || 'Unknown Company';
  const logo = job.company?.logoUrl || 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png'; // fallback

  return (
    <div className="space-y-8 pb-10">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-bold group"
      >
        <div className="p-2 bg-white rounded-xl border border-gray-100 group-hover:border-blue-200 shadow-sm">
          <ChevronLeft size={20} />
        </div>
        Back to search
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex gap-6">
            <Link
              to={`/dashboard/company/${job.companyId}`}
              className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center p-3 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
            >
              {job.company?.logoUrl ? (
                <img src={job.company.logoUrl} alt={companyName} className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="text-3xl font-black text-gray-400 group-hover:text-blue-500 uppercase transition-colors">
                  {companyName.charAt(0)}
                </div>
              )}
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 font-medium">
                <Link
                  to={`/dashboard/company/${job.companyId}`}
                  className="flex items-center gap-1.5 hover:text-[#0052FF] transition-colors"
                >
                  <Building2 size={18} className="text-blue-500" /> {companyName}
                </Link>
                <span className="flex items-center gap-1.5"><MapPin size={18} className="text-blue-500" /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={18} className="text-blue-500" /> {formatDate(job.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleSave}
              disabled={saving}
              className={`flex-grow md:flex-grow-0 p-3.5 rounded-2xl border transition-all disabled:opacity-50 ${isSaved ? 'bg-blue-50 text-[#0052FF] border-blue-100' : 'bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 border-gray-100'}`}
              title={isSaved ? "Saved Job" : "Save Job"}
            >
              {saving ? <Loader2 className="animate-spin" size={24} /> : <Bookmark size={24} className={isSaved ? "fill-current" : ""} />}
            </button>
            <button className="flex-grow md:flex-grow-0 p-3.5 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-2xl border border-gray-100 transition-all">
              <Share2 size={24} />
            </button>
            <button 
              onClick={handleApply}
              disabled={applying || !job.isActive || hasApplied}
              className={`flex-grow md:flex-grow-0 px-8 py-3.5 font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                hasApplied 
                ? 'bg-gray-100 text-gray-500 shadow-none cursor-not-allowed'
                : 'bg-[#0052FF] text-white hover:bg-blue-600 shadow-blue-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'
              }`}
            >
              {applying ? (
                <><Loader2 className="animate-spin" size={18} /> Applying...</>
              ) : hasApplied ? (
                <><CheckCircle2 size={18} className="text-green-500" /> Applied</>
              ) : job.isActive ? (
                'Apply Now'
              ) : (
                'Closed'
              )}
            </button>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-10 border-t border-gray-50">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Salary</p>
            <p className="font-bold text-gray-900 flex items-center gap-1">
              {job.salaryMin
                ? `${formatIDR(job.salaryMin)} - ${formatIDR(job.salaryMax)}`
                : 'Not Specified'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Job Type</p>
            <p className="font-bold text-gray-900 flex items-center gap-1"><Briefcase size={16} className="text-blue-500" /> {normalizeJobType(job.employmentType)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Experience</p>
            <p className="font-bold text-gray-900 flex items-center gap-1"><Users size={16} className="text-purple-500" /> {job.experienceLevel}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Education</p>
            <p className="font-bold text-gray-900 flex items-center gap-1"><Globe size={16} className="text-orange-500" /> {job.educationLevel}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Job Description</h2>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap break-words">
              {job.description}
            </p>
          </section>

          {/* Responsibilities */}
          {responsibilities.length > 0 && (
            <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Responsibilities</h2>
              <ul className="space-y-4">
                {responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-4 text-gray-600 min-w-0">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 size={20} className="text-blue-500" />
                    </div>
                    <span className="text-lg leading-relaxed break-all min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {requirements.length > 0 && (
            <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-4">
                {requirements.map((item, i) => (
                  <li key={i} className="flex gap-4 text-gray-600 min-w-0">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-lg leading-relaxed break-all min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Company Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">About the Company</h3>
            <Link
              to={`/dashboard/company/${job.companyId}`}
              className="flex items-center gap-4 mb-6 group"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                {job.company?.logoUrl ? (
                  <img src={job.company.logoUrl} alt={companyName} className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="text-xl font-black text-gray-400 group-hover:text-blue-500 uppercase transition-colors">
                    {companyName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors">{companyName}</h4>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
            </Link>
          </div>

          {/* Benefits */}
          {benefits.length > 0 && (
            <div className="bg-[#0052FF] rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-6">Job Benefits</h3>
                <ul className="space-y-4">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium min-w-0">
                      <div className="p-1 bg-white/20 rounded-full flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <span className="break-all min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
