import React from 'react';
import { 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageJobs: React.FC = () => {
  const jobs = [
    { id: 1, title: 'Senior Product Designer', applicants: 45, status: 'Active', posted: 'Oct 24, 2023', deadline: 'Nov 24, 2023', views: 1240 },
    { id: 2, title: 'Cloud Solutions Architect', applicants: 28, status: 'Active', posted: 'Oct 20, 2023', deadline: 'Nov 20, 2023', views: 890 },
    { id: 3, title: 'Software Engineer (L4)', applicants: 124, status: 'Closed', posted: 'Sep 15, 2023', deadline: 'Oct 15, 2023', views: 3450 },
  ];

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
          <input type="text" placeholder="Search jobs..." className="bg-transparent border-none focus:ring-0 w-full ml-2 outline-none font-medium" />
        </div>
        <button className="px-6 py-3 bg-white text-gray-600 font-bold rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Job Details</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Applicants</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Stats</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <Link to={`/dashboard/recruiter/jobs/${job.id}/applicants`} className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors cursor-pointer">{job.title}</Link>
                    <p className="text-xs text-gray-400 font-bold uppercase mt-1">Posted on {job.posted}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg font-bold text-gray-900">{job.applicants}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Candidates</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">{job.views}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Views</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      job.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {job.status === 'Active' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {job.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/dashboard/recruiter/edit-job/${job.id}`}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-500 rounded-xl transition-all border border-transparent hover:border-blue-100"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
