import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Bookmark, Clock, DollarSign, Loader2, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getJobs, saveJob, getSavedJobs } from '../../api/jobs';
import { toast } from 'react-hot-toast';

const formatDate = (dateString) => {
  if (!dateString) return 'New';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const [jobsRes, savedRes] = await Promise.all([
          getJobs(),
          getSavedJobs().catch(() => ({ data: [] }))
        ]);
        
        if (jobsRes.data && Array.isArray(jobsRes.data)) {
          const shuffledJobs = [...jobsRes.data].sort(() => 0.5 - Math.random());
          setJobs(shuffledJobs);
          const initialSaved = savedRes.data?.map(s => s.jobId) || [];
          if (initialSaved.length > 0) setSavedJobIds(initialSaved);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error('Failed to load jobs', error);
        toast.error('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSaveJob = async (jobId) => {
    try {
      setSavingId(jobId);
      await saveJob({ jobId });
      setSavedJobIds(prev => [...prev, jobId]);
      toast.success('Job saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to save job. You might have saved it already.');
    } finally {
      setSavingId(null);
    }
  };

  const filteredJobs = jobs.filter(job => {
    return job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Jobs</h1>
        <p className="text-gray-500 mt-1">Explore thousands of job opportunities.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 focus-within:border-blue-300 transition-colors">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Job title or company" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:ring-0 w-full ml-2 outline-none font-medium" 
          />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
          <p className="text-gray-600 text-lg font-medium">Loading jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-[2.5rem]">
          <p className="text-gray-600 font-bold text-lg">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => {
            const companyName = job.company?.name || job.companyName || 'Unknown Company';
            const isBookmarked = savedJobIds.includes(job.id) || job.isSaved;
            
            return (
              <div key={job.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center p-2 text-xl font-black text-gray-400 uppercase group-hover:bg-blue-50 group-hover:text-[#0052FF] transition-colors">
                    {companyName.charAt(0)}
                  </div>
                  <button 
                    onClick={() => handleSaveJob(job.id)}
                    disabled={savingId === job.id}
                    className={`transition-colors disabled:opacity-50 p-1.5 hover:bg-blue-50 rounded-lg ${isBookmarked ? 'text-[#0052FF] bg-blue-50' : 'text-gray-300 hover:text-[#0052FF]'}`}
                  >
                    {savingId === job.id ? <Loader2 size={20} className="animate-spin" /> : <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />}
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052FF] transition-colors">
                      <Link to={`/dashboard/jobs/${job.id}`} className="after:absolute after:inset-0 relative z-0">
                        {job.title}
                      </Link>
                    </h3>
                    {job.category && (
                      <span className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100 hidden sm:inline-block z-10 relative">
                        {job.category.name}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-medium text-gray-500">{companyName}</p>
                  {job.category && (
                    <span className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100 sm:hidden z-10 relative">
                      {job.category.name}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                    <MapPin size={14} /> {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                    {job.salaryMin ? `${formatIDR(job.salaryMin)} - ${formatIDR(job.salaryMax)}` : 'Not specified'}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                    <Briefcase size={14} /> {normalizeJobType(job.employmentType)}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                    <Clock size={14} /> {formatDate(job.createdAt)}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 relative z-10">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[70%]">
                    {job.jobSkills?.slice(0, 3).map((js, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md whitespace-nowrap">
                        {js.skill?.name || 'Skill'}
                      </span>
                    ))}
                  </div>
                  <Link to={`/dashboard/jobs/${job.id}`} className="text-sm font-bold text-gray-900 hover:text-[#0052FF] transition-colors flex-shrink-0">
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FindJobs;
