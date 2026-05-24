import React from 'react';
import { ChevronRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import Badge from '../../components/Badge';

const MyApplications = () => {
  const applications = [
    { company: 'Google', position: 'Senior Product Designer', date: 'Oct 24, 2023', status: 'Pending' },
    { company: 'Spotify', position: 'Visual UI Designer', date: 'Oct 20, 2023', status: 'Interview' },
    { company: 'Airbnb', position: 'Frontend Engineer', date: 'Oct 15, 2023', status: 'Accepted' },
    { company: 'Meta', position: 'Product Manager', date: 'Oct 10, 2023', status: 'Rejected' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Applications"
        subtitle="Track your job application status."
      />

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
                    <Badge variant={app.status}>
                      {app.status}
                    </Badge>
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

