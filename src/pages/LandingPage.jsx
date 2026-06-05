import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Search, Briefcase, Zap, CheckCircle2, ChevronRight, Star, Building2, User, FileText } from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans selection:bg-blue-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0052FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">kerjaNow</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#features" className="hover:text-[#0052FF] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#0052FF] transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-[#0052FF] transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Log in
            </Link>
            <Link to="/register" className="px-5 py-2.5 bg-[#0052FF] text-white text-sm font-bold rounded-xl hover:bg-blue-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 overflow-hidden relative">
        {/* Background Decorations */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 -right-32 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1 text-center lg:text-left z-10"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
                <Zap size={14} className="fill-blue-600" /> AI-Powered Job Matching
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                Find the job that <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-blue-400">truly matches</span> you.
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg lg:text-xl text-gray-500 mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
                Our advanced AI analyzes your resume and skills to connect you with opportunities that fit your exact profile. Skip the endless searching.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-[#0052FF] text-white text-base font-bold rounded-2xl hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2">
                  Start for Free <ChevronRight size={20} />
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 text-base font-bold rounded-2xl hover:bg-gray-50 border border-gray-100 transition-all flex items-center justify-center">
                  I'm a Recruiter
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-gray-500">
                <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> No credit card required</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> AI Resume Analysis</div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative z-10 w-full max-w-lg lg:max-w-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl shadow-blue-900/5 p-8">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-3xl -z-10 rotate-12 opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0052FF] rounded-[2rem] -z-10 -rotate-6 opacity-10"></div>
                
                {/* Mock UI Element */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">Your AI Matches</h3>
                      <p className="text-xs text-gray-400 font-medium">Updated just now</p>
                    </div>
                    <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg">98% Match</div>
                  </div>
                  
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                        <Building2 size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">Senior Frontend Engineer</h4>
                        <p className="text-xs text-gray-500 font-medium">Tech Corp • Remote</p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-blue-50 text-[#0052FF] flex items-center justify-center hover:bg-[#0052FF] hover:text-white transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Everything you need to land your next role</h2>
            <p className="text-lg text-gray-500 font-medium">We've reimagined the job search process. No more endless scrolling or black-hole applications.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Smart Discovery',
                desc: 'Our AI finds jobs that match your unique skills and experience, not just keywords.',
                color: 'bg-blue-50 text-[#0052FF]'
              },
              {
                icon: FileText,
                title: 'Resume Analysis',
                desc: 'Upload your CV and get instant AI feedback to improve your chances of getting hired.',
                color: 'bg-amber-50 text-amber-500'
              },
              {
                icon: Zap,
                title: 'One-Click Apply',
                desc: 'Save your profile once and apply to dozens of matching roles with a single click.',
                color: 'bg-green-50 text-green-500'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">How it works</h2>
            <p className="text-lg text-gray-500 font-medium">Your dream job is just three steps away.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
            
            {[
              { step: '01', title: 'Create Profile', desc: 'Sign up and upload your resume. Our AI extracts your skills and experience instantly.' },
              { step: '02', title: 'AI Matching', desc: 'Our smart algorithm connects you with roles that perfectly align with your background.' },
              { step: '03', title: 'Get Hired', desc: 'Apply with one click, track your applications, and land your next big opportunity.' }
            ].map((item, i) => (
              <div key={i} className="relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-[#0052FF] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-200 rotate-3 hover:rotate-0 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Loved by job seekers</h2>
            <p className="text-lg text-gray-500 font-medium">Don't just take our word for it. Here's what our users have to say.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Jenkins', role: 'Product Designer', text: 'kerjaNow made finding a job so much easier. The AI matching was incredibly accurate, and I got hired in just 2 weeks!' },
              { name: 'Michael Chen', role: 'Software Engineer', text: 'I was tired of filling out endless applications. With kerjaNow, my profile did the work for me. Highly recommended.' },
              { name: 'Amanda Smith', role: 'Marketing Manager', text: 'The resume analysis feature gave me great insights to improve my CV. I received interview requests almost immediately.' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-lg hover:shadow-gray-200/50 transition-all">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-medium mb-8">"{item.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#0052FF] font-bold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-[#0052FF] rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to upgrade your career?</h2>
            <p className="text-blue-100 text-lg font-medium max-w-2xl mx-auto mb-10">Join thousands of job seekers who found their perfect match using kerjaNow's AI.</p>
            <Link to="/register" className="inline-flex px-8 py-4 bg-white text-[#0052FF] text-base font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl">
              Create Your Free Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0052FF] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">kerjaNow</span>
          </div>
          <p className="text-sm font-medium text-gray-400">© {new Date().getFullYear()} kerjaNow. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-[#0052FF]">Privacy</a>
            <a href="#" className="hover:text-[#0052FF]">Terms</a>
            <a href="#" className="hover:text-[#0052FF]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
