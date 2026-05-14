import React from 'react';
import { Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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
        <div className="relative z-10 flex items-center gap-2 mb-20">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-semibold tracking-tight">kerjaNow</span>
        </div>

        {/* Hero Illustration / Mockup Placeholder */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
            <div className="bg-[#f8faff] rounded-xl overflow-hidden shadow-lg aspect-[16/10] flex flex-col">
              {/* Fake UI Header */}
              <div className="h-10 bg-white border-b flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="ml-4 h-5 bg-gray-100 rounded w-48"></div>
              </div>
              {/* Fake UI Body */}
              <div className="flex-grow p-4 grid grid-cols-4 gap-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white border rounded-lg p-3 flex flex-col gap-2">
                    <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                    <div className="h-2 bg-gray-50 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center max-w-md">
            <h2 className="text-3xl font-medium mb-4 leading-tight">
              "Shines with its Smooth Integrations"
            </h2>
            <p className="text-blue-100 text-lg">
              effortlessly linking with diverse third-party tools to enhance user experience through improved efficiency and coordination.
            </p>
          </div>
        </div>

        {/* Footer Indicators */}
        <div className="relative z-10 mt-auto flex gap-2">
          <div className="h-1 w-16 bg-white rounded-full"></div>
          <div className="h-1 w-16 bg-white/30 rounded-full"></div>
          <div className="h-1 w-16 bg-white/30 rounded-full"></div>
          <div className="h-1 w-16 bg-white/30 rounded-full"></div>
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
