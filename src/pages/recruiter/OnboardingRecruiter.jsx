import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Select from '../../components/Select';
import { saveRecruiterOnboarding, getRecruiterOnboarding } from '../../api/onboarding';

const OnboardingRecruiter = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    companySize: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    country: 'Indonesia',
  });

  useEffect(() => {
    const checkCompanyProfile = async () => {
      try {
        const response = await getRecruiterOnboarding();
        if (response && response.data) {
          // Company profile exists, recruiter is already onboarded. Redirect to dashboard.
          const userStr = localStorage.getItem('user');
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              user.isOnboarded = true;
              localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
              console.error('Failed to update cached user onboarding status:', e);
            }
          }
          navigate('/dashboard/recruiter', { replace: true });
        }
      } catch (err) {
        // 404 is expected if they haven't onboarded yet, we just ignore it
        console.log("No recruiter company profile found, onboarding is required.");
      }
    };
    checkCompanyProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isStep1Valid = () => {
    return (
      (formData.name || '').trim() !== '' &&
      (formData.description || '').trim() !== '' &&
      (formData.industry || '').trim() !== '' &&
      (formData.companySize || '').trim() !== ''
    );
  };

  const isStep2Valid = () => {
    return (
      (formData.email || '').trim() !== '' &&
      (formData.phone || '').trim() !== '' &&
      (formData.address || '').trim() !== '' &&
      (formData.city || '').trim() !== '' &&
      (formData.province || '').trim() !== '' &&
      (formData.country || '').trim() !== ''
    );
  };

  const nextStep = () => {
    if (!isStep1Valid()) {
      toast.error('Please fill in all company identity fields in Step 1 before continuing.');
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleCompleteSetup = async (e) => {
    e.preventDefault();
    if (!isStep2Valid()) {
      toast.error('Please fill in all location and contact fields in Step 2.');
      return;
    }
    setLoading(true);
    try {
      await saveRecruiterOnboarding(formData);

      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.isOnboarded = true;
        localStorage.setItem('user', JSON.stringify(user));
      }

      toast.success('Company profile set up successfully!');
      setTimeout(() => {
        navigate('/dashboard/recruiter');
      }, 1000);
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        // Company already exists — update localStorage and redirect
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          user.isOnboarded = true;
          localStorage.setItem('user', JSON.stringify(user));
        }
        toast.success('Company profile already set up. Redirecting...');
        setTimeout(() => navigate('/dashboard/recruiter'), 800);
      } else {
        toast.error(err.response?.data?.message || 'Failed to complete setup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corporation" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Description</label>
                  <textarea 
                    rows={4} 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What does your company do?" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Briefcase size={16} /> Industry
                    </label>
                    <input 
                      type="text" 
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g. Technology, Finance" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Users size={16} /> Company Size
                    </label>
                    <Select
                      name="companySize"
                      placeholder="Select Size"
                      value={formData.companySize}
                      onChange={handleChange}
                      options={[
                        { value: '1-10', label: '1-10 Employees' },
                        { value: '11-50', label: '11-50 Employees' },
                        { value: '51-200', label: '51-200 Employees' },
                        { value: '201-500', label: '201-500 Employees' },
                        { value: '500+', label: '500+ Employees' },
                      ]}
                      className="py-4 rounded-2xl"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Globe size={16} /> Website URL (Optional)
                  </label>
                  <input 
                    type="url" 
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.example.com" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    disabled={loading}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hr@company.com" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+62..." 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Office Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street name, Building No." 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Jakarta" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Province</label>
                  <input 
                    type="text" 
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="DKI Jakarta" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                  <input 
                    type="text" 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Indonesia" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
            <button 
              type="button"
              onClick={prevStep}
              className={`flex items-center gap-2 font-bold transition-colors ${step === 1 ? 'invisible' : 'text-gray-400 hover:text-gray-900'}`}
              disabled={loading}
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            {step < 2 ? (
              <button 
                type="button"
                onClick={nextStep}
                disabled={!isStep1Valid() || loading}
                className="px-10 py-4 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-lg shadow-blue-200 flex items-center gap-2 cursor-pointer"
              >
                Continue <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                type="button"
                onClick={handleCompleteSetup}
                disabled={!isStep2Valid() || loading}
                className="px-10 py-4 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-200 flex items-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Saving...
                  </>
                ) : (
                  <>
                    Complete Setup <CheckCircle2 size={20} />
                  </>
                )}
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
