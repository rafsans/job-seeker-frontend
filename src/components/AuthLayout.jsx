import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    quote: `"Shines with its Smooth Integrations"`,
    description: `effortlessly linking with diverse third-party tools to enhance user experience through improved efficiency and coordination.`,
    color: 'bg-blue-400',
    mockType: 'grid',
  },
  {
    quote: `"Smart AI Candidate Matching"`,
    description: `Instantly connect the right talent with the right opportunities using our advanced profile screening algorithms.`,
    color: 'bg-green-400',
    mockType: 'matching',
  },
  {
    quote: `"Intuitive & Sleek Dashboards"`,
    description: `Monitor applications, resume updates, and recruiter activity all in one beautifully unified space.`,
    color: 'bg-indigo-400',
    mockType: 'dashboard',
  },
  {
    quote: `"Secure & Seamless Verification"`,
    description: `Verified roles ensure recruiters connect with legitimate candidates, building a trusted ecosystem for hiring.`,
    color: 'bg-amber-400',
    mockType: 'security',
  },
];

const AuthLayout = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderMockUI = (type) => {
    switch (type) {
      case 'matching':
        return (
          <div className="flex-grow p-5 flex flex-col gap-4 justify-center bg-gray-50 h-full">
            <div className="flex justify-between items-center bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 font-bold">JD</div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-24 mb-1.5"></div>
                  <div className="h-2 bg-gray-100 rounded w-16"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-500">98% Match</div>
                <div className="h-2 bg-green-100 rounded w-12 mt-1.5 ml-auto"></div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold">AS</div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-28 mb-1.5"></div>
                  <div className="h-2 bg-gray-100 rounded w-20"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-blue-500">89% Match</div>
                <div className="h-2 bg-blue-100 rounded w-12 mt-1.5 ml-auto"></div>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="flex-grow p-5 flex flex-col gap-4 bg-gray-50 h-full justify-center">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                <div className="text-[10px] font-bold text-gray-400 mb-1">APPLICATIONS</div>
                <div className="text-xl font-bold text-gray-800">142</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                <div className="text-[10px] font-bold text-gray-400 mb-1">INTERVIEWS</div>
                <div className="text-xl font-bold text-gray-800">12</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                <div className="text-[10px] font-bold text-gray-400 mb-1">OFFERS</div>
                <div className="text-xl font-bold text-gray-800">4</div>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="h-2 bg-gray-100 rounded w-full"></div>
              <div className="h-2 bg-gray-50 rounded w-5/6"></div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="flex-grow p-6 flex flex-col items-center justify-center gap-4 text-center bg-gray-50 h-full">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shadow-sm animate-bounce">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="h-3 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
              <div className="h-2 bg-gray-100 rounded w-48 mx-auto"></div>
            </div>
          </div>
        );
      case 'grid':
      default:
        return (
          <div className="flex-grow p-4 grid grid-cols-4 gap-3 bg-gray-50 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-lg p-2.5 flex flex-col gap-2 shadow-sm">
                <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
                <div className="h-2 bg-gray-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side: Branding and Hero */}
      <div className="hidden lg:flex flex-col w-1/2 bg-[#0052FF] p-12 text-white relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-3xl"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-semibold tracking-tight">kerjaNow</span>
        </div>

        {/* Hero Illustration / Slider */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center my-auto">
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex-grow flex flex-col relative h-full">
              {/* Fake UI Header */}
              <div className="h-10 bg-white border-b flex items-center px-4 gap-2 flex-shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="ml-4 h-5 bg-gray-100 rounded w-48"></div>
              </div>

              {/* Slider Body */}
              <div className="flex-grow relative overflow-hidden h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 h-full w-full"
                  >
                    {renderMockUI(slides[currentSlide].mockType)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center max-w-md h-32 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 className="text-2xl font-bold mb-3 leading-tight tracking-tight">
                  {slides[currentSlide].quote}
                </h2>
                <p className="text-blue-100 text-base font-medium">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Indicators */}
        <div className="relative z-10 mt-auto flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="group focus:outline-none py-2"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === i 
                    ? 'w-16 bg-white' 
                    : 'w-8 bg-white/30 group-hover:bg-white/50'
                }`}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-grow flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
