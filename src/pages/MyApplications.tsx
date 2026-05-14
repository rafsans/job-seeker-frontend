import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, ChevronRight } from 'lucide-react';

const MyApplications: React.FC = () => {
  const applications = [
    { company: 'Google', position: 'Senior Product Designer', date: 'Oct 24, 2023', status: 'Pending', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { company: 'Spotify', position: 'Visual UI Designer', date: 'Oct 20, 2023', status: 'Interview', icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
    { company: 'Airbnb', position: 'Frontend Engineer', date: 'Oct 15, 2023', status: 'Accepted', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
    { company: 'Meta', position: 'Product Manager', date: 'Oct 10, 2023', status: 'Rejected', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 mt-1">Track your job application status.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Company</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Date Applied</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-gray-900">{app.company}</p>
                  </td>
                  <td className="px-8 py-6 text-gray-500 font-medium">{app.position}</td>
                  <td className="px-8 py-6 text-gray-500">{app.date}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${app.bg} ${app.color}`}>
                      <app.icon size={14} />
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-300 group-hover:text-[#0052FF] transition-colors">
                      <ChevronRight size={20} />
                    </button>
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

export default MyApplications;
