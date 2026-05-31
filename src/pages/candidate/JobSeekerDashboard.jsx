import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  DollarSign,
  FileText,
  Bookmark,
  Lock,
  Zap,
  ChevronRight,
  X,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { getJobs } from '../../api/jobs';
import { getCandidateProfile } from '../../api/candidateProfile';

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

const JobSeekerDashboard = ({ isPremium, setIsPremium }) => {
  const [showSubscription, setShowSubscription] = useState(false);
  
  // State for data
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, jobsRes] = await Promise.all([
          getCandidateProfile().catch(() => null), // Catch error if no profile yet
          getJobs()
        ]);
        
        setUserProfile(profileRes);
        // Take the first 3 jobs as recommended, next 4 as AI (just for UI demo)
        const allJobs = Array.isArray(jobsRes.data) ? jobsRes.data : [];
        setJobs(allJobs);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const recommendedJobs = useMemo(() => {
    return [...jobs].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [jobs]);
  
  const topCategoriesData = userProfile?.top_categories || {};
  const topCategories = [topCategoriesData.category1, topCategoriesData.category2, topCategoriesData.category3].filter(Boolean);
  
  let aiJobs = [];
  if (topCategories.length > 0) {
    aiJobs = jobs.filter(job => job.category && topCategories.includes(job.category.title));
  }
  
  // Fallback to random/sequential if no AI jobs matched
  if (aiJobs.length === 0) {
    aiJobs = jobs.slice(3);
  }
  
  // Limit based on premium status
  aiJobs = isPremium ? aiJobs : aiJobs.slice(0, 4);

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
        <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
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
        <p className="text-gray-600 text-lg font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  // Parse name from profile
  const firstName = userProfile?.firstName || 'User';

  return (
    <div className="space-y-12 pb-10">
      {renderSubscriptionModal()}
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hello, {firstName}!</h1>
          <p className="text-gray-500 mt-1">Here is what's happening with your job applications today.</p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {/* Main Jobs Section */}
        <div className="space-y-12">
          
          {/* General Recommendations */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
              <Link to="/dashboard/find-jobs" className="text-[#0052FF] font-bold text-sm hover:underline">View all</Link>
            </div>
            
            {recommendedJobs.length > 0 ? (
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2 group-hover:bg-blue-50 transition-colors">
                        {/* Fake logo based on company name */}
                        <div className="text-xl font-black text-gray-400 group-hover:text-[#0052FF] uppercase">
                          {(job.company?.name || job.companyName || 'C').charAt(0)}
                        </div>
                      </div>
                      <div className="flex-grow space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052FF] transition-colors">
                              <Link to={`/dashboard/jobs/${job.id}`} className="after:absolute after:inset-0">
                                {job.title}
                              </Link>
                            </h3>
                            {job.category && (
                              <span className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100 z-10 relative hidden sm:inline-block">
                                {job.category.name}
                              </span>
                            )}
                          </div>
                          <button className="text-gray-300 hover:text-[#0052FF] transition-colors relative z-10 self-end sm:self-auto">
                            <Bookmark size={20} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500 font-medium text-sm">{job.company?.name || 'Unknown Company'}</p>
                          {job.category && (
                            <span className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100 z-10 relative sm:hidden">
                              {job.category.name}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                            <MapPin size={14} />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                            {job.salaryMin ? `${formatIDR(job.salaryMin)} - ${formatIDR(job.salaryMax)}` : 'Not specified'}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                            <Briefcase size={14} />
                            {normalizeJobType(job.employmentType)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white border border-gray-100 rounded-3xl">
                <p className="text-gray-500">No recommended jobs at the moment.</p>
              </div>
            )}
          </section>

          {/* AI Recommendations (Paywalled) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="text-amber-500 fill-amber-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-md">Matched with Resume</span>
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase rounded-lg">Premium Only</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiJobs.map((job) => (
                <div key={job.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 hover:border-amber-200 transition-all group relative">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center p-1.5 text-gray-400 group-hover:text-amber-500 group-hover:bg-amber-50 font-black text-xl">
                        {(job.company?.name || job.companyName || 'C').charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors text-sm truncate max-w-[150px]">{job.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold truncate max-w-[150px]">{job.company?.name || 'Unknown Company'}</p>
                        {job.category && (
                          <p className="text-[9px] text-amber-500 font-bold uppercase mt-1">{job.category.name}</p>
                        )}
                      </div>
                   </div>
                   <div className="flex flex-wrap gap-2 mb-4">
                      {job.jobSkills?.slice(0, 3).map((js, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[9px] font-bold rounded-md uppercase">{js.skill?.name || 'Skill'}</span>
                      ))}
                   </div>
                   <Link to={`/dashboard/jobs/${job.id}`} className="text-xs font-bold text-gray-900 flex items-center gap-1 hover:text-amber-600 after:absolute after:inset-0">
                      View details <ChevronRight size={14} />
                   </Link>
                </div>
              ))}
            </div>

            {/* Paywall Overlay / Button */}
            {!isPremium && (
              <div className="relative mt-4">
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFF] via-[#F8FAFF]/80 to-transparent z-10 h-20 -top-20"></div>
                <div className="bg-white rounded-[2.5rem] border border-blue-100 p-8 text-center shadow-xl shadow-blue-500/5 relative z-20 overflow-hidden group">
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-blue-50 text-[#0052FF] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Lock size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock 50+ AI Matched Roles</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto font-medium text-balance">
                      Our AI analyzed your resume and found more high-paying roles that match your skills perfectly. Upgrade to unlock them.
                    </p>
                    <button 
                      onClick={() => setShowSubscription(true)}
                      className="px-10 py-3.5 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 cursor-pointer hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] flex items-center gap-2 mx-auto"
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                  {/* Background Decoration */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                </div>
              </div>
            )}
          </section>
        </div>


      </div>
    </div>
  );
};

export default JobSeekerDashboard;
