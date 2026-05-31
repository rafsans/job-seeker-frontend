import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Loader2,
  Download,
  AlertCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getJobById } from '../../api/jobs';
import { getJobApplications, updateApplicationStatus } from '../../api/recruiter';

// Status color helper
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'PENDING': return 'bg-gray-100 text-gray-500 border border-gray-200';
    case 'REVIEWED': return 'bg-yellow-50 text-yellow-600 border border-yellow-100';
    case 'INTERVIEW': return 'bg-blue-50 text-blue-600 border border-blue-100';
    case 'OFFERED': return 'bg-purple-50 text-purple-600 border border-purple-100';
    case 'HIRED': return 'bg-green-50 text-green-600 border border-green-100';
    case 'REJECTED': return 'bg-red-50 text-red-600 border border-red-100';
    default: return 'bg-gray-50 text-gray-400 border border-gray-100';
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const JobApplicantsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Job ID

  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states for applicant details
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch job details and applicant list
  const loadData = async () => {
    try {
      const [jobRes, applicantsRes] = await Promise.all([
        getJobById(id),
        getJobApplications(id)
      ]);
      setJob(jobRes.data);
      setApplicants(Array.isArray(applicantsRes.data) ? applicantsRes.data : []);
    } catch (err) {
      console.error('Failed to fetch job applicants data:', err);
      toast.error('Failed to load applicant list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Handle Accept / Reject action
  const handleUpdateStatus = async (applicationId, action) => {
    const confirmMsg = `Are you sure you want to ${action === 'accept' ? 'HIRE' : 'REJECT'} this applicant?`;
    if (!window.confirm(confirmMsg)) return;

    setUpdatingId(applicationId);
    try {
      await updateApplicationStatus(applicationId, {
        action,
        reason: action === 'accept' ? 'Hired via job portal' : 'Rejected after profile review'
      });
      toast.success(`Applicant ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
      
      // Update local state
      const updatedStatus = action === 'accept' ? 'HIRED' : 'REJECTED';
      setApplicants(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: updatedStatus } : app
      ));

      // Update selected applicant inside modal if open
      if (selectedApplicant && selectedApplicant.id === applicationId) {
        setSelectedApplicant(prev => ({ ...prev, status: updatedStatus }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error(err.response?.data?.message || 'Failed to update application status.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading applicant listings...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-16 bg-white border border-gray-100 rounded-[2.5rem]">
        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
        <p className="text-gray-600 font-bold text-lg">Job Listing Not Found</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#0052FF] font-bold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10 font-sans">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/dashboard/recruiter/manage-jobs')}
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
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">{job.title}</h1>
              <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg border ${
                job.isActive !== false ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-100 text-gray-400 border-gray-200'
              }`}>
                {job.isActive !== false ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><MapPin size={16} className="text-blue-500" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-blue-500" /> {job.employmentType}</span>
              <span className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> Posted {formatDate(job.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
             <div className="text-center px-4 border-r border-gray-200">
                <p className="text-2xl font-extrabold text-gray-900">{job.salaryMin ? `${job.currency} ${Number(job.salaryMin).toLocaleString()}` : '-'}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Min Salary</p>
             </div>
             <div className="text-center px-4">
                <p className="text-2xl font-extrabold text-[#0052FF]">{applicants.length}</p>
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
            {applicants.length === 0 ? (
              <div className="p-16 text-center text-gray-400 font-medium">
                <Users size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-bold text-lg mb-1">No applicants yet</p>
                <p className="text-sm">We'll notify you as soon as candidates apply for this listing.</p>
              </div>
            ) : (
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
                  {applicants.map((app) => {
                    const details = app.user?.userDetails;
                    const firstName = details?.firstName || '';
                    const lastName = details?.lastName || '';
                    const fullName = [firstName, lastName].filter(Boolean).join(' ') || app.user?.email || 'Candidate';
                    const initials = fullName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

                    return (
                      <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                              {initials}
                            </div>
                            <div>
                              <p 
                                onClick={() => setSelectedApplicant(app)}
                                className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors cursor-pointer"
                              >
                                {fullName}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5">
                                {app.user?.email && (
                                  <a href={`mailto:${app.user.email}`} className="text-gray-400 hover:text-blue-500 transition-colors" title="Send Email">
                                    <Mail size={14} />
                                  </a>
                                )}
                                {details?.phone && (
                                  <a href={`tel:${details.phone}`} className="text-gray-400 hover:text-blue-500 transition-colors" title="Call Phone">
                                    <Phone size={14} />
                                  </a>
                                )}
                                {app.resumeUrl && (
                                  <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="View Resume">
                                    <FileText size={14} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center text-gray-400 text-sm font-semibold">
                          {formatDate(app.createdAt)}
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider ${getStatusBadgeClass(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {app.status === 'APPLIED' || app.status === 'PENDING' ? (
                              <>
                                <button 
                                  onClick={() => handleUpdateStatus(app.id, 'accept')}
                                  disabled={updatingId === app.id}
                                  className="p-2.5 bg-gray-50 text-gray-400 hover:text-green-500 rounded-xl transition-all border border-transparent hover:border-green-100"
                                  title="Hire Candidate"
                                >
                                  <CheckCircle2 size={18} />
                                </button>
                                <button 
                                  onClick={() => handleUpdateStatus(app.id, 'reject')}
                                  disabled={updatingId === app.id}
                                  className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100"
                                  title="Reject Candidate"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            ) : null}
                            <button 
                              onClick={() => setSelectedApplicant(app)}
                              className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all"
                              title="View Application Details"
                            >
                              <ChevronRight size={18} />
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

      {/* Modern High-Fidelity Modal Overlay for Applicant Detail */}
      {selectedApplicant && (() => {
        const details = selectedApplicant.user?.userDetails;
        const fullName = [details?.firstName, details?.lastName].filter(Boolean).join(' ') || selectedApplicant.user?.email || 'Candidate';
        const initials = fullName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
        
        return (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] max-w-2xl w-full border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="p-8 border-b border-gray-100 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-xl">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">{fullName}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider mt-2 ${getStatusBadgeClass(selectedApplicant.status)}`}>
                      {selectedApplicant.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApplicant(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {/* Contact grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <Mail className="text-[#0052FF] shrink-0" size={20} />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                      <a href={`mailto:${selectedApplicant.user?.email}`} className="font-bold text-sm text-gray-900 hover:underline truncate block">
                        {selectedApplicant.user?.email || '-'}
                      </a>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <Phone className="text-[#0052FF] shrink-0" size={20} />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                      <a href={`tel:${details?.phone}`} className="font-bold text-sm text-gray-900 hover:underline block">
                        {details?.phone || '-'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 text-lg">Cover Letter</h4>
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedApplicant.coverLetter || 'No cover letter provided by the candidate.'}
                  </div>
                </div>

                {/* Resume download / view */}
                {selectedApplicant.resumeUrl && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-lg">Attached Resume</h4>
                    <div className="p-4 border border-blue-100 bg-blue-50/30 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[#0052FF]">
                        <FileText size={24} />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Curriculum Vitae (Resume)</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Candidate Attachment</p>
                        </div>
                      </div>
                      <a 
                        href={selectedApplicant.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-5 py-2.5 bg-[#0052FF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-100 flex items-center gap-2"
                      >
                        <Download size={14} /> Open Resume
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer actions inside Modal */}
              <div className="p-8 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setSelectedApplicant(null)}
                  className="px-6 py-3 bg-white border border-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {(selectedApplicant.status === 'APPLIED' || selectedApplicant.status === 'PENDING') && (
                  <>
                    <button 
                      onClick={() => handleUpdateStatus(selectedApplicant.id, 'reject')}
                      disabled={updatingId === selectedApplicant.id}
                      className="px-6 py-3 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 font-bold rounded-2xl transition-colors disabled:opacity-50"
                    >
                      Reject Application
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedApplicant.id, 'accept')}
                      disabled={updatingId === selectedApplicant.id}
                      className="px-6 py-3 bg-[#0052FF] hover:bg-blue-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                      Accept & Hire
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default JobApplicantsDetail;
