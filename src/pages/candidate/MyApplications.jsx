import React, { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Badge from '../../components/Badge';
import { getMyApplications } from '../../api/jobs';
import { toast } from 'react-hot-toast';

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await getMyApplications();
        if (res.data && Array.isArray(res.data)) {
          setApplications(res.data);
        }
      } catch (err) {
        console.error('Failed to load applications:', err);
        toast.error('Failed to load your applications.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="My Applications"
        subtitle="Track your job application status."
      />

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-16">
            <Loader2 className="animate-spin text-[#0052FF] mr-3" size={32} />
            <p className="text-gray-500 font-bold">Loading your applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center p-16">
            <p className="text-gray-500 font-bold text-lg mb-2">You haven't applied to any jobs yet.</p>
            <Link to="/dashboard/find-jobs" className="text-[#0052FF] font-bold hover:underline">Browse Jobs</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Company</th>
                  <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Position</th>
                  <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Date Applied</th>
                  <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map((app) => {
                  const job = app.job || {};
                  const companyName = job.company?.name || job.companyName || 'Unknown Company';
                  
                  return (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black uppercase shadow-sm">
                            {companyName.charAt(0)}
                          </div>
                          <p className="font-bold text-gray-900">{companyName}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-gray-500 font-medium">
                        <Link to={`/dashboard/jobs/${job.id}`} className="hover:text-[#0052FF] transition-colors">
                          {job.title || 'Unknown Position'}
                        </Link>
                      </td>
                      <td className="px-8 py-6 text-gray-500 font-medium">{formatDate(app.createdAt)}</td>
                      <td className="px-8 py-6">
                        <Badge variant={app.status}>
                          {app.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link to={`/dashboard/jobs/${job.id}`} className="inline-block p-2 text-gray-300 hover:text-[#0052FF] hover:bg-blue-50 rounded-lg transition-all" title="View Job Details">
                          <ChevronRight size={20} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
