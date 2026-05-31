import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  FileText, 
  Upload, 
  Trash2, 
  Download, 
  ExternalLink, 
  Clock,
  Loader2,
  AlertCircle,
  Sparkles,
  Lock,
  X,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getCandidateProfile, uploadResume, analyzeResume } from '../../api/candidateProfile';

const ResumeManagement = ({ isPremium, setIsPremium }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedbackData, setAiFeedbackData] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getCandidateProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to load profile:', err);
      toast.error('Failed to load your resume details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB.');
      return;
    }

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only PDF and DOCX formats are supported.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    try {
      await uploadResume(formData);
      toast.success('Resume uploaded successfully!');
      await fetchProfile();
    } catch (err) {
      console.error('Failed to upload resume:', err);
      toast.error(err.response?.data?.message || 'Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleBoxClick = () => {
    if (uploading) return;
    fileInputRef.current?.click();
  };

  const handleRemove = async () => {
    toast.error('Deleting resume is not supported yet. Please upload a new one to replace it.');
  };

  const handleAnalyze = async () => {
    if (!isPremium) {
      setShowSubscription(true);
      return;
    }
    try {
      setIsAnalyzing(true);
      const data = await analyzeResume();
      setAiFeedbackData(data);
      toast.success("Resume analyzed successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to analyze resume. Make sure you have uploaded one.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderSubscriptionModal = () => {
    if (!showSubscription) return null;

    const plans = [
      { name: 'Starter', price: 'Free', features: ['Standard Recommendations', 'Basic Profile', '3 Applications/mo'], current: true },
      { name: 'Professional', price: '$12', features: ['AI Recommendations', 'Priority Support', 'Unlimited Applications', 'Profile Badge'], current: false, recommended: true },
      { name: 'Enterprise', price: '$29', features: ['Direct Recruiter Access', 'Resume Analysis', 'Career Coaching', 'All Pro Features'], current: false },
    ];

    return createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowSubscription(false)}></div>
        <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex, flex-col animate-in zoom-in-95 duration-300">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFF] flex-shrink-0 rounded-t-[2.5rem]">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h3>
              <p className="text-gray-500 text-sm mt-1 font-medium">Choose the plan that fits your career goals.</p>
            </div>
            <button onClick={() => setShowSubscription(false)} className="p-2 hover:bg-gray-200 rounded-xl transition-colors"><X size={24} /></button>
          </div>
          
          <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-[2rem] border-2 transition-all ${plan.recommended ? 'border-[#0052FF] bg-blue-50/20 shadow-xl' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                {plan.recommended && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0052FF] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Recommended</span>
                )}
                <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.price !== 'Free' && <span className="text-gray-400 font-bold">/mo</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <CheckCircle2 size={18} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => {
                    if (!plan.current) {
                      setIsPremium(true);
                      setShowSubscription(false);
                    }
                  }}
                  className={`w-full py-3.5 rounded-2xl font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                  plan.current 
                  ? 'bg-gray-100 text-gray-400 cursor-default hover:scale-100 active:scale-100' 
                  : plan.recommended 
                    ? 'bg-[#0052FF] text-white hover:bg-blue-600 shadow-lg shadow-blue-200 hover:-translate-y-1' 
                    : 'bg-gray-900 text-white hover:bg-gray-800 hover:-translate-y-1'
                }`}>
                  {plan.current ? 'Your Current Plan' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading your resume...</p>
      </div>
    );
  }

  const hasResume = Boolean(profile?.profile?.personal?.resume_url);
  
  // Format the full URL properly (Backend usually returns relative or absolute path)
  const getFullResumeUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    // Assuming backend serves static files at root or /uploads
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const rawResumeUrl = profile?.profile?.personal?.resume_url || '';
  const resumeUrl = hasResume ? getFullResumeUrl(rawResumeUrl) : '#';

  // Extract filename from URL or use default
  const getFilename = (url) => {
    if (!url) return 'resume.pdf';
    const parts = url.split('/');
    return parts[parts.length - 1] || 'resume.pdf';
  };

  return (
    <div className="space-y-8 pb-10">
      {renderSubscriptionModal()}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resume Management</h1>
        <p className="text-gray-500 mt-1 font-medium">Manage and update your curriculum vitae for job applications.</p>
      </div>

      <div className="w-full max-w-[90rem] animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Current Resume</h3>
                {hasResume && (
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg">Active</span>
                )}
              </div>

              {hasResume ? (
                <div className="p-8 border-2 border-gray-50 rounded-3xl flex flex-col md:flex-row items-center gap-8 group hover:border-blue-100 transition-all bg-gray-50/30">
                  <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-blue-600 border border-gray-100 group-hover:scale-105 transition-transform flex-shrink-0">
                    <FileText size={48} />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-900 mb-1 truncate max-w-[200px]">{getFilename(rawResumeUrl)}</h4>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> Uploaded recently</span>
                      <span className="flex items-center gap-1.5">PDF/DOCX</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                      <a 
                        href={resumeUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-[#0052FF] text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                      >
                        <Download size={16} /> Download
                      </a>
                      <a 
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-white text-gray-600 text-sm font-bold rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2"
                      >
                        <ExternalLink size={16} /> View
                      </a>
                      <button 
                        onClick={handleRemove}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Remove Resume"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center bg-gray-50/30">
                  <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
                  <p className="text-gray-600 font-bold">No resume uploaded yet.</p>
                  <p className="text-gray-400 text-sm mt-1">Upload your resume to stand out to recruiters.</p>
                </div>
              )}

              {/* Re-upload / Upload section */}
              <div className="mt-10 pt-10 border-t border-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{hasResume ? 'Upload New Version' : 'Upload Resume'}</h3>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                />
                <div 
                  onClick={handleBoxClick}
                  className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
                    uploading ? 'border-blue-300 bg-blue-50/50 cursor-wait' : 'border-gray-200 hover:border-blue-400 bg-gray-50/50 cursor-pointer group'
                  }`}
                >
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="animate-spin text-[#0052FF] mb-4" size={32} />
                      <p className="font-bold text-[#0052FF]">Uploading your resume...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto text-gray-400 group-hover:text-[#0052FF] mb-4 transition-colors" size={32} />
                      <p className="font-bold text-gray-700">Click to browse or drop your resume here</p>
                      <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Supported formats: PDF, DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Feedback Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm h-full flex flex-col relative overflow-hidden group">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shadow-sm border border-purple-100">
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">AI Feedback</h3>
                    <p className="text-xs text-gray-500 font-medium">Smart insights for your resume</p>
                  </div>
                </div>
                {isPremium && (
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !hasResume}
                    className="px-4 py-2 bg-purple-50 text-purple-600 text-sm font-bold rounded-xl hover:bg-purple-100 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                  >
                    {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    {isAnalyzing ? 'Analyzing...' : 'Generate AI Analysis'}
                  </button>
                )}
              </div>

              <div className="flex-grow space-y-4 relative">
                {aiFeedbackData ? (
                  <div className="space-y-6">
                    <div className="p-6 bg-purple-50/50 rounded-3xl border border-purple-100/50 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {aiFeedbackData.cv_feedback || "Analisis selesai, namun tidak ada feedback yang dihasilkan."}
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50 h-full min-h-[300px]">
                    <Sparkles className="text-gray-300 mb-4" size={40} />
                    <p className="text-gray-500 font-bold text-lg mb-2">No feedback available yet</p>
                    <p className="text-gray-400 text-sm max-w-xs mb-6">Click the analyze button to get smart insights on your current resume.</p>
                    {!hasResume && (
                      <p className="text-red-400 text-xs font-bold uppercase tracking-widest mt-2">Please upload a resume first</p>
                    )}
                  </div>
                )}
                
                {/* Paywall Overlay */}
                {!isPremium && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl">
                    <div className="bg-white rounded-[2.5rem] border border-blue-100 p-8 text-center shadow-xl shadow-blue-500/5 relative z-20 overflow-hidden group max-w-sm">
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-50 text-[#0052FF] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Lock size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Feature</h3>
                        <p className="text-gray-500 text-sm mb-6 mx-auto font-medium text-balance">
                          Unlock AI Resume Analysis and get smart feedback from our virtual HR assistant.
                        </p>
                        <button 
                          onClick={() => setShowSubscription(true)}
                          className="px-8 py-3 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 cursor-pointer hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]"
                        >
                          Upgrade Now
                        </button>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeManagement;
