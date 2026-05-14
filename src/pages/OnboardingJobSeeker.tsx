import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  X, 
  Globe, 
  MapPin, 
  Phone,
  CheckCircle2,
  FileText,
  Upload,
  File
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingJobSeeker: React.FC = () => {
  const [step, setStep] = useState(1);
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
    skills: [] as string[],
    certifications: [{ name: '', issuingOrganization: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '', description: '' }]
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const addSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, currentSkill] });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

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
          {/* STEP 1: PERSONAL INFO */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="text-blue-500" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="tel" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="+62 812..." />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Street name, Building No..." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Jakarta" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Province</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="DKI Jakarta" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="12345" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Indonesia" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATION */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="text-blue-500" /> Education History
                </h3>
                <button className="text-[#0052FF] font-semibold text-sm flex items-center gap-1 hover:underline">
                  <Plus size={18} /> Add Education
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Institution / University</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="University of Indonesia" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Degree</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Bachelor's Degree" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Field of Study</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Computer Science" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <input type="checkbox" id="currEdu" className="w-5 h-5 accent-blue-600" />
                    <label htmlFor="currEdu" className="text-sm text-gray-600 font-medium">I am currently studying here</label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Grade (GPA)</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="3.8 / 4.0" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Activities and societies..."></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXPERIENCE */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="text-blue-500" /> Work Experience
                </h3>
                <button className="text-[#0052FF] font-semibold text-sm flex items-center gap-1 hover:underline">
                  <Plus size={18} /> Add Experience
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Google Inc." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location Type</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                      <option>On-site</option>
                      <option>Remote</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Singapore, SG" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <input type="checkbox" id="currWork" className="w-5 h-5 accent-blue-600" />
                    <label htmlFor="currWork" className="text-sm text-gray-600 font-medium">I am currently working here</label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Responsibilities and role..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Achievements</label>
                    <textarea rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Key accomplishments..."></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SKILLS & CERTS */}
          {step === 4 && (
            <div className="space-y-10">
              {/* Skills Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="text-blue-500" /> Skills & Expertise
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="e.g. React.js, Project Management..."
                    className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  />
                  <button
                    onClick={addSkill}
                    className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2"
                  >
                    <Plus size={20} /> Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full border border-blue-100 animate-in fade-in zoom-in duration-300">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                  {formData.skills.length === 0 && (
                    <p className="text-gray-400 text-sm italic">No skills added yet.</p>
                  )}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Award className="text-blue-500" /> Certifications
                  </h3>
                  <button className="text-[#0052FF] font-semibold text-sm flex items-center gap-1 hover:underline">
                    <Plus size={18} /> Add Certification
                  </button>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Certification Name</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="AWS Certified Solutions Architect" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Issuing Organization</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Amazon Web Services" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Date</label>
                      <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiration Date</label>
                      <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Credential ID</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="ABC-123-XYZ" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Credential URL</label>
                      <input type="url" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="https://..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="About the certification..."></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: RESUME UPLOAD */}
          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Upload your Resume</h3>
                <p className="text-gray-500 mt-2">Upload your CV to let recruiters know more about you.</p>
              </div>

              <div className="max-w-xl mx-auto">
                <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-blue-400 transition-all group cursor-pointer bg-gray-50/50">
                  <input type="file" className="hidden" id="resume-upload" />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="text-blue-500" size={32} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400 mt-1 uppercase font-bold tracking-widest">PDF, DOC, DOCX (Max 5MB)</p>
                  </label>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex items-center gap-4 border border-blue-100">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <File size={20} />
                   </div>
                   <div className="flex-grow">
                      <p className="text-sm font-bold text-gray-900">resume_olivia_reiss.pdf</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Uploaded just now • 1.2 MB</p>
                   </div>
                   <CheckCircle2 className="text-green-500" size={20} />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
            <button
              onClick={prevStep}
              className={`flex items-center gap-2 font-bold transition-colors ${
                step === 1 ? 'invisible' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <ChevronLeft size={20} /> Back
            </button>
            {step < 5 ? (
              <button
                onClick={nextStep}
                className="px-8 py-3.5 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                Continue <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-200 flex items-center gap-2"
              >
                Complete Profile <CheckCircle2 size={20} />
              </button>
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
