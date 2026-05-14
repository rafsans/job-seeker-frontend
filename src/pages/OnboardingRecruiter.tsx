import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Briefcase,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingRecruiter: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Form handling logic would go here in a production app

  const nextStep = () => setStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#F8FAFF] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#0052FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">kerjaNow</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Setup your Company Profile</h1>
          <p className="text-gray-500 mt-2 text-lg">Tell us about your organization to start hiring.</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12 gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#0052FF]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#0052FF] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <span className="font-bold">Basic Info</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-200"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#0052FF]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#0052FF] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className="font-bold">Location & Contact</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-500/5 p-8 md:p-12 transition-all">
          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-4 text-[#0052FF]">
                <Building2 size={24} />
                <h2 className="text-xl font-bold text-gray-900">Company Identity</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Corporation" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Description</label>
                  <textarea 
                    rows={4} 
                    placeholder="What does your company do?" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Briefcase size={16} /> Industry
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Technology, Finance" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Users size={16} /> Company Size
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium">
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="51-200">51-200 Employees</option>
                      <option value="201-500">201-500 Employees</option>
                      <option value="500+">500+ Employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Globe size={16} /> Website URL (Optional)
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://www.example.com" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-4 text-[#0052FF]">
                <MapPin size={24} />
                <h2 className="text-xl font-bold text-gray-900">Location & Contact</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} /> Business Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="hr@company.com" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+62..." 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Office Address</label>
                  <input 
                    type="text" 
                    placeholder="Street name, Building No." 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input 
                    type="text" 
                    placeholder="Jakarta" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Province</label>
                  <input 
                    type="text" 
                    placeholder="DKI Jakarta" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                  <input 
                    type="text" 
                    placeholder="Indonesia" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
            <button 
              onClick={prevStep}
              className={`flex items-center gap-2 font-bold transition-colors ${step === 1 ? 'invisible' : 'text-gray-400 hover:text-gray-900'}`}
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            {step < 2 ? (
              <button 
                onClick={nextStep}
                className="px-10 py-4 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                Continue <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={() => navigate('/dashboard/recruiter')}
                className="px-10 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-200 flex items-center gap-2"
              >
                Complete Setup <CheckCircle2 size={20} />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          By completing this setup, you agree to our Terms of Service for Employers.
        </p>
      </div>
    </div>
  );
};

export default OnboardingRecruiter;
