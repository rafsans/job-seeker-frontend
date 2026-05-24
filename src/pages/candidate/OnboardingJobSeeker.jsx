import React, { useState, useEffect } from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Button from '../../components/Button';
import {
  savePersonalInfo,
  saveEducationInfo,
  saveExperienceInfo,
  saveSkillsCertsInfo,
  saveResumeInfo,
  getOnboardingData,
} from '../../api/onboarding';

// Onboarding Step Components
import PersonalInfoStep from './onboarding-steps/PersonalInfoStep';
import EducationStep from './onboarding-steps/EducationStep';
import ExperienceStep from './onboarding-steps/ExperienceStep';
import SkillsCertificationsStep from './onboarding-steps/SkillsCertificationsStep';
import ResumeUploadStep from './onboarding-steps/ResumeUploadStep';

const OnboardingJobSeeker = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Multi-step form state
  const [formData, setFormData] = useState({
    // Step 1: Personal
    firstName: '', lastName: '', gender: '', phone: '', address: '', city: '', province: '', postalCode: '', country: '',
    // Step 2: Education
    education: [{ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', isCurrent: false, grade: '', description: '' }],
    // Step 3: Experience
    experience: [{ companyName: '', position: '', employmentType: '', location: '', locationType: '', startDate: '', endDate: '', isCurrent: false, description: '', achievement: '' }],
    // Step 4: Skills & Certs
    skills: [],
    certifications: [{ name: '', issuingOrganization: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '', description: '' }],
    // Step 5: Resume
    resumeUrl: '',
    resumeFileName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      setLoading(true);
      try {
        const response = await getOnboardingData();
        const data = response.data;
        if (data) {
          // If already has resumeUrl, redirect to dashboard
          if (data.userDetails) {
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
              navigate('/dashboard', { replace: true });
              return;
            }

          // Otherwise, pre-populate what is saved
          setFormData(prev => {
            const updated = { ...prev };
            if (data.userDetails) {
              updated.firstName = data.userDetails.firstName || '';
              updated.lastName = data.userDetails.lastName || '';
              updated.gender = data.userDetails.gender || '';
              updated.phone = data.userDetails.phone || '';
              updated.address = data.userDetails.address || '';
              updated.city = data.userDetails.city || '';
              updated.province = data.userDetails.province || '';
              updated.postalCode = data.userDetails.postalCode || '';
              updated.country = data.userDetails.country || '';
              updated.resumeUrl = data.userDetails.resumeUrl || '';
            }
            if (data.educations && data.educations.length > 0) {
              updated.education = data.educations.map(edu => ({
                institution: edu.institution || '',
                degree: edu.degree || '',
                fieldOfStudy: edu.fieldOfStudy || '',
                startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
                endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
                isCurrent: edu.isCurrent || false,
                grade: edu.grade || '',
                description: edu.description || '',
              }));
            }
            if (data.experiences && data.experiences.length > 0) {
              updated.experience = data.experiences.map(exp => ({
                companyName: exp.companyName || '',
                position: exp.position || '',
                employmentType: exp.employmentType || '',
                location: exp.location || '',
                locationType: exp.locationType || '',
                startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
                endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
                isCurrent: exp.isCurrent || false,
                description: exp.description || '',
                achievement: exp.achievement || '',
              }));
            }
            return updated;
          });
        }
      } catch (err) {
        console.error('Failed to load onboarding status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingStatus();
  }, [navigate]);

  const isStep1Valid = () => {
    return (
      (formData.firstName || '').trim() !== '' &&
      (formData.lastName || '').trim() !== '' &&
      (formData.gender || '').trim() !== '' &&
      (formData.phone || '').trim() !== '' &&
      (formData.address || '').trim() !== '' &&
      (formData.city || '').trim() !== '' &&
      (formData.province || '').trim() !== '' &&
      (formData.postalCode || '').trim() !== '' &&
      (formData.country || '').trim() !== ''
    );
  };

  const isStep2Valid = () => {
    const education = formData.education || [];
    if (education.length === 0) return false;
    return education.every(edu => 
      (edu.institution || '').trim() !== '' &&
      (edu.degree || '').trim() !== '' &&
      (edu.fieldOfStudy || '').trim() !== '' &&
      (edu.startDate || '').trim() !== ''
    );
  };

  const isStep3Valid = () => {
    const experience = formData.experience || [];
    if (experience.length === 0) return false;
    return experience.every(exp => 
      (exp.companyName || '').trim() !== '' &&
      (exp.position || '').trim() !== '' &&
      (exp.employmentType || '').trim() !== '' &&
      (exp.locationType || '').trim() !== '' &&
      (exp.location || '').trim() !== '' &&
      (exp.startDate || '').trim() !== ''
    );
  };

  const isStep4Valid = () => {
    const skills = formData.skills || [];
    const certifications = formData.certifications || [];
    if (skills.length === 0) return false;
    return certifications.every(cert => {
      const name = (cert.name || '').trim();
      const org = (cert.issuingOrganization || '').trim();
      const date = (cert.issueDate || '').trim();
      if (!name && !org && !date) return true;
      return name !== '' && org !== '' && date !== '';
    });
  };

  const isCurrentStepValid = () => {
    if (step === 1) return isStep1Valid();
    if (step === 2) return isStep2Valid();
    if (step === 3) return isStep3Valid();
    if (step === 4) return isStep4Valid();
    return true;
  };

  const nextStep = async () => {
    if (!isCurrentStepValid()) {
      toast.error('Please fill in all required fields before continuing.');
      return;
    }

    setLoading(true);
    try {
      if (step === 1) {
        const personalData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          country: formData.country,
        };
        await savePersonalInfo(personalData);
      } else if (step === 2) {
        await saveEducationInfo({ education: formData.education });
      } else if (step === 3) {
        await saveExperienceInfo({ experience: formData.experience });
      } else if (step === 4) {
        const certifications = formData.certifications
          .map((cert) => ({
            name: cert.name,
            issuingOrganization: cert.issuingOrganization,
            issueDate: cert.issueDate,
            expiryDate: cert.expiryDate || null,
            credentialId: cert.credentialId || null,
            credentialUrl: cert.credentialUrl || null,
            description: cert.description || '',
          }))
          .filter((cert) => cert.name && cert.issuingOrganization && cert.issueDate);

        await saveSkillsCertsInfo({
          skills: formData.skills,
          certifications,
        });
      }
      setStep((prev) => Math.min(prev + 1, 5));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async () => {
    setLoading(true);
    try {
      await saveResumeInfo({ resumeUrl: formData.resumeUrl || null });

      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.isOnboarded = true;
        localStorage.setItem('user', JSON.stringify(user));
      }

      toast.success('Profile completed successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to complete profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, title: 'Personal', icon: User },
    { id: 2, title: 'Education', icon: GraduationCap },
    { id: 3, title: 'Experience', icon: Briefcase },
    { id: 4, title: 'Skills & Certs', icon: Award },
    { id: 5, title: 'Resume', icon: FileText },
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-12 w-full max-w-4xl mx-auto">
      {steps.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              step >= s.id ? 'bg-[#0052FF] text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'
            }`}>
              <s.icon size={20} />
            </div>
            <span className={`absolute -bottom-7 text-xs font-semibold whitespace-nowrap ${
              step >= s.id ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {s.title}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-grow h-0.5 mx-2 sm:mx-4 ${step > s.id ? 'bg-[#0052FF]' : 'bg-gray-100'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#0052FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">kerjaNow</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Complete your profile</h1>
          <p className="text-gray-500">Help us find the best job opportunities for you.</p>
        </div>

        {renderStepIndicator()}

        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8 md:p-10 mt-16 border border-gray-100">
          {/* Render Step Components */}
          {step === 1 && (
            <PersonalInfoStep 
              formData={formData} 
              onChange={handleChange} 
            />
          )}

          {step === 2 && (
            <EducationStep 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}

          {step === 3 && (
            <ExperienceStep 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}

          {step === 4 && (
            <SkillsCertificationsStep 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}

          {step === 5 && (
            <ResumeUploadStep 
              formData={formData}
              setFormData={setFormData}
            />
          )}

          <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
            <Button
              onClick={prevStep}
              variant="ghost"
              className={`flex items-center gap-2 font-bold transition-colors ${
                step === 1 ? 'invisible' : 'text-gray-500 hover:text-gray-950'
              }`}
              icon={ChevronLeft}
              disabled={loading}
            >
              Back
            </Button>
            {step < 5 ? (
              <Button
                onClick={nextStep}
                variant="primary"
                className="px-8 py-3.5 shadow-lg shadow-blue-200"
                icon={ChevronRight}
                iconPosition="right"
                disabled={!isCurrentStepValid() || loading}
                loading={loading}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleCompleteProfile}
                variant="primary"
                className="px-8 py-3.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                icon={CheckCircle2}
                iconPosition="right"
                loading={loading}
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Your information is secure and will only be shared with potential employers.
        </p>
      </div>
    </div>
  );
};

export default OnboardingJobSeeker;
