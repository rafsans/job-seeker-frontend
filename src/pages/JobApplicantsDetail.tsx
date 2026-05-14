import React from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Briefcase, 
  Clock, 
  Users, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ChevronRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const JobApplicantsDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for the specific job
  const job = {
    id: id,
    title: 'Senior Product Designer',
    location: 'Singapore (Remote)',
    type: 'Full-time',
    posted: 'Oct 24, 2023',
    status: 'Active',
    views: 1240,
    applicantsCount: 45
  };

  const applicants = [
    { id: 1, name: 'Alex Johnson', status: 'INTERVIEW', date: 'Oct 24, 2023', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { id: 2, name: 'Sarah Williams', status: 'APPLIED', date: 'Oct 23, 2023', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { id: 3, name: 'Michael Chen', status: 'SHORTLISTED', date: 'Oct 22, 2023', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    { id: 4, name: 'Emily Davis', status: 'REJECTED', date: 'Oct 21, 2023', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'INTERVIEW': return 'bg-blue-50 text-blue-600';
      case 'SHORTLISTED': return 'bg-purple-50 text-purple-600';
      case 'REJECTED': return 'bg-red-50 text-red-600';
      case 'HIRED': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 pb-10 font-sans">
      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-bold group"
      >
        <div className="p-2 bg-white rounded-xl border border-gray-100 group-hover:border-blue-200 shadow-sm">
          <ChevronLeft size={20} />
        </div>
        Back to Jobs
      </button>

      {/* Job Info Header */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">{job.title}</h1>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg">
                {job.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><MapPin size={16} className="text-blue-500" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-blue-500" /> {job.type}</span>
              <span className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> Posted {job.posted}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
             <div className="text-center px-4 border-r border-gray-200">
                <p className="text-2xl font-extrabold text-gray-900">{job.views}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Views</p>
             </div>
             <div className="text-center px-4">
                <p className="text-2xl font-extrabold text-[#0052FF]">{job.applicantsCount}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Applicants</p>
             </div>
          </div>
        </div>
      </div>

      {/* Applicants Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="text-[#0052FF]" /> Candidate Applications
        </h2>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Candidate</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Applied Date</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={applicant.photo} alt={applicant.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors cursor-pointer">{applicant.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <button className="text-gray-400 hover:text-blue-500 transition-colors"><Mail size={14} /></button>
                            <button className="text-gray-400 hover:text-blue-500 transition-colors"><Phone size={14} /></button>
                            <button className="text-gray-400 hover:text-blue-500 transition-colors"><FileText size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center text-gray-400 text-sm font-medium">{applicant.date}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider ${getStatusColor(applicant.status)}`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-green-500 rounded-xl transition-all">
                          <CheckCircle2 size={18} />
                        </button>
                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                          <XCircle size={18} />
                        </button>
                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                          <ChevronRight size={18} />
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
    </div>
  );
};

export default JobApplicantsDetail;
