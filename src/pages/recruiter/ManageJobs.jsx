import React, { useState, useEffect } from 'react';
import { 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Loader2,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRecruiterJobs, deleteRecruiterJob } from '../../api/recruiter';

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch jobs on mount
  const loadJobs = async () => {
    try {
      const response = await getRecruiterJobs();
      setJobs(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to load recruiter jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Handle Delete Job
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteRecruiterJob(id);
      setJobs(jobs.filter(j => j.id !== id));
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Failed to delete job posting. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading your job listings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
          <p className="text-gray-500 mt-1 font-medium">View and manage your active job listings.</p>
        </div>
        <Link to="/dashboard/recruiter/post-job" className="px-8 py-3.5 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
          Post a New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search jobs by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:ring-0 w-full ml-2 outline-none font-medium" 
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filteredJobs.length === 0 ? (
            <div className="p-16 text-center">
              <Briefcase size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold text-lg mb-2">No job postings found</p>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                {searchTerm ? 'No listings match your search criteria. Try a different search term.' : 'Get started by publishing your very first job posting.'}
              </p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Job Details</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Applicants</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Deadline</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredJobs.map((job) => {
                  const isActive = job.isActive !== false;
                  return (
                    <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <Link to={`/dashboard/recruiter/jobs/${job.id}/applicants`} className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors cursor-pointer">
                          {job.title}
                        </Link>
                        <p className="text-xs text-gray-400 font-bold uppercase mt-1">
                          Posted on {formatDate(job.createdAt)}
                        </p>
                        {job.category && (
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">
                            {job.category.name}
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-lg font-bold text-gray-900">{job._count?.applications || 0}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Candidates</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-sm font-bold text-gray-600">
                          {formatDate(job.deadLine)}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                          isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {isActive ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            to={`/dashboard/recruiter/edit-job/${job.id}`}
                            className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-500 rounded-xl transition-all border border-transparent hover:border-blue-100"
                            title="Edit Job"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(job.id)}
                            disabled={deletingId === job.id}
                            className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100 disabled:opacity-50"
                            title="Delete Job"
                          >
                            {deletingId === job.id ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
