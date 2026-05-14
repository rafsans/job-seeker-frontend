import React from 'react';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ChevronRight
} from 'lucide-react';

const Applicants: React.FC = () => {
  const applicants = [
    { id: 1, name: 'Alex Johnson', job: 'Senior Product Designer', status: 'INTERVIEW', date: 'Oct 24, 2023', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { id: 2, name: 'Sarah Williams', job: 'Cloud Solutions Architect', status: 'APPLIED', date: 'Oct 23, 2023', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { id: 3, name: 'Michael Chen', job: 'Senior Product Designer', status: 'SHORTLISTED', date: 'Oct 22, 2023', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    { id: 4, name: 'Emily Davis', job: 'Software Engineer (L4)', status: 'REJECTED', date: 'Oct 21, 2023', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
        <p className="text-gray-500 mt-1 font-medium">Review and manage candidates for your open positions.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          <Search size={20} className="text-gray-400" />
          <input type="text" placeholder="Search by name or job title..." className="bg-transparent border-none focus:ring-0 w-full ml-2 outline-none font-medium" />
        </div>
        <button className="px-6 py-3 bg-white text-gray-600 font-bold rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2">
          <Filter size={18} /> All Jobs
        </button>
      </div>

      {/* Applicants List */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Candidate</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Applied Job</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">Date Applied</th>
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
                  <td className="px-8 py-6">
                    <p className="font-bold text-gray-700 text-sm">{applicant.job}</p>
                  </td>
                  <td className="px-8 py-6 text-gray-400 text-sm font-medium">{applicant.date}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider ${getStatusColor(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-green-500 rounded-xl transition-all border border-transparent hover:border-green-100">
                        <CheckCircle2 size={18} />
                      </button>
                      <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100">
                        <XCircle size={18} />
                      </button>
                      <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all border border-transparent hover:border-gray-200">
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
  );
};

export default Applicants;
