import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  CheckCircle2
} from 'lucide-react';

const JobSeekerDashboard: React.FC = () => {
  const [showSubscription, setShowSubscription] = useState(false);

  const jobs = [
    {
      id: '1',
      company: 'Google',
      logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png',
      position: 'Senior Product Designer',
      location: 'Singapore (Remote)',
      salary: '$6,000 - $8,500',
      type: 'Full-time',
      tags: ['Design', 'Product', 'Figma'],
      time: '2 hours ago'
    },
    {
      id: '2',
      company: 'Spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      position: 'Visual UI Designer',
      location: 'Stockholm, SE',
      salary: '$5,500 - $7,000',
      type: 'Full-time',
      tags: ['Visual', 'Music', 'UI'],
      time: '5 hours ago'
    }
  ];

  const aiJobs = [
    { id: 'ai-1', company: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', position: 'AI Research Engineer', location: 'San Francisco (Hybrid)', salary: '$180k - $250k', tags: ['GPT-4', 'PyTorch'] },
    { id: 'ai-2', company: 'Anthropic', logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png', position: 'Machine Learning Ops', location: 'Remote', salary: '$150k - $200k', tags: ['MLOps', 'AWS'] },
    { id: 'ai-3', company: 'DeepMind', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', position: 'NLP Specialist', location: 'London, UK', salary: '£90k - £130k', tags: ['NLP', 'Python'] },
    { id: 'ai-4', company: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg', position: 'Autopilot Engineer', location: 'Palo Alto, CA', salary: '$170k - $220k', tags: ['CV', 'C++'] },
  ];

  const renderSubscriptionModal = () => {
    if (!showSubscription) return null;

    const plans = [
      { name: 'Starter', price: 'Free', features: ['Standard Recommendations', 'Basic Profile', '3 Applications/mo'], current: true },
      { name: 'Professional', price: '$12', features: ['AI Recommendations', 'Priority Support', 'Unlimited Applications', 'Profile Badge'], current: false, recommended: true },
      { name: 'Enterprise', price: '$29', features: ['Direct Recruiter Access', 'Resume Analysis', 'Career Coaching', 'All Pro Features'], current: false },
    ];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowSubscription(false)}></div>
        <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFF]">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h3>
              <p className="text-gray-500 text-sm mt-1 font-medium">Choose the plan that fits your career goals.</p>
            </div>
            <button onClick={() => setShowSubscription(false)} className="p-2 hover:bg-gray-200 rounded-xl transition-colors"><X size={24} /></button>
          </div>
          
          <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <button className={`w-full py-3.5 rounded-2xl font-bold transition-all ${
                  plan.current 
                  ? 'bg-gray-100 text-gray-400 cursor-default' 
                  : plan.recommended 
                    ? 'bg-[#0052FF] text-white hover:bg-blue-600 shadow-lg shadow-blue-200' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  {plan.current ? 'Your Current Plan' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {renderSubscriptionModal()}
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hello, Olivia! 👋</h1>
          <p className="text-gray-500 mt-1">Here is what's happening with your job applications today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Jobs Section */}
        <div className="lg:col-span-2 space-y-12">
          {/* General Recommendations */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recommended Jobs</h2>
              <button className="text-[#0052FF] font-bold text-sm hover:underline">View all</button>
            </div>
            
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2 group-hover:bg-blue-50 transition-colors">
                      <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain rounded" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052FF] transition-colors">
                          <Link to={`/dashboard/jobs/${job.id}`} className="after:absolute after:inset-0">
                            {job.position}
                          </Link>
                        </h3>
                        <button className="text-gray-300 hover:text-[#0052FF] transition-colors relative z-10">
                          <Bookmark size={20} />
                        </button>
                      </div>
                      <p className="text-gray-500 font-medium text-sm">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                          <MapPin size={14} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                          <DollarSign size={14} />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                          <Clock size={14} />
                          {job.time || 'New'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Recommendations (Paywalled) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="text-amber-500 fill-amber-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900">Rekomendasi AI</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-md">Matched with your Resume</span>
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase rounded-lg">Premium Only</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiJobs.map((job) => (
                <div key={job.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 hover:border-amber-200 transition-all group relative">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center p-1.5">
                        <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors text-sm">{job.position}</h4>
                        <p className="text-[10px] text-gray-400 font-bold">{job.company}</p>
                      </div>
                   </div>
                   <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[9px] font-bold rounded-md uppercase">{tag}</span>
                      ))}
                   </div>
                   <Link to={`/dashboard/jobs/${job.id}`} className="text-xs font-bold text-gray-900 flex items-center gap-1 hover:text-amber-600 after:absolute after:inset-0">
                      View details <ChevronRight size={14} />
                   </Link>
                </div>
              ))}
            </div>

            {/* Paywall Overlay / Button */}
            <div className="relative mt-4">
              <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFF] via-[#F8FAFF]/80 to-transparent z-10 h-20 -top-20"></div>
              <div className="bg-white rounded-[2.5rem] border border-blue-100 p-8 text-center shadow-xl shadow-blue-500/5 relative z-20 overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-50 text-[#0052FF] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock 50+ AI Matched Roles</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto font-medium text-balance">
                    Our AI analyzed your resume and found 54 more high-paying roles that match your skills perfectly. Upgrade to unlock them.
                  </p>
                  <button 
                    onClick={() => setShowSubscription(true)}
                    className="px-10 py-3.5 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 mx-auto"
                  >
                    Upgrade to Premium
                  </button>
                </div>
                {/* Background Decoration */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-10">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    i === 1 ? 'bg-blue-50 text-blue-500' : 'bg-gray-50 text-gray-400'
                  }`}>
                    {i === 1 ? <Briefcase size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {i === 1 ? 'Applied to Google' : i === 2 ? 'Resume updated' : 'Profile viewed by Spotify'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
