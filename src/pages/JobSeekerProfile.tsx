import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Download, 
  Edit3, 
  Plus, 
  Trash2, 
  X, 
  ExternalLink, 
  Bookmark 
} from 'lucide-react';

const JobSeekerProfile: React.FC = () => {
  const [modalType, setModalType] = useState<null | 'edu' | 'exp' | 'cert' | 'skills' | 'basic'>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [newSkill, setNewSkill] = useState('');

  // Mock data state 100% Aligned with Prisma Schema
  const [educations, setEducations] = useState([
    {
      id: 1,
      institution: 'University of Indonesia',
      degree: "Bachelor's Degree",
      fieldOfStudy: 'Computer Science',
      startDate: '2013-08-01',
      endDate: '2017-06-01',
      isCurrent: false,
      grade: '3.85 / 4.0',
      description: 'Focused on Human-Computer Interaction and Software Engineering.'
    }
  ]);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      companyName: 'Google',
      position: 'Senior UI Designer',
      employmentType: 'FULL_TIME',
      location: 'Singapore',
      locationType: 'HYBRID',
      startDate: '2021-01-01',
      endDate: '',
      isCurrent: true,
      description: 'Leading the design team for Google Search mobile experience.'
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: 'Google UX Design Professional Certificate',
      issuingOrganization: 'Coursera',
      issueDate: '2021-01-01',
      expiryDate: '',
      credentialId: 'UX-123456',
      credentialUrl: 'https://coursera.org/verify/ux-123',
      description: 'Comprehensive program covering the end-to-end UX design process.'
    }
  ]);

  const [userDetails, setUserDetails] = useState({
    // UserDetails Model Fields
    firstName: 'Olivia',
    lastName: 'Reiss',
    phone: '+62 812 3456 7890',
    dateOfBirth: '1995-05-12',
    gender: 'FEMALE',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
    country: 'Indonesia',
    bio: 'Passionate UI/UX Designer with over 5 years of experience in creating user-centric digital products.',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    resumeUrl: '#',
    // Linked User Fields
    email: 'oliviareiss91@gmail.com',
    role: 'CANDIDATE',
    isVerified: true,
    // Skill Relation
    skills: ['Figma', 'UI Design', 'User Research', 'React.js', 'Tailwind CSS']
  });

  // Predefined skills from your database
  const PREDEFINED_SKILLS = [
    'React', 'TypeScript', 'Node.js', 'Figma', 'UI Design', 'UX Research', 
    'Tailwind CSS', 'Next.js', 'PostgreSQL', 'Prisma', 'Docker', 'AWS', 
    'Python', 'Project Management', 'Agile', 'GraphQL', 'Redux', 'MongoDB'
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSkillInputChange = (val: string) => {
    setNewSkill(val);
    if (val.trim()) {
      const filtered = PREDEFINED_SKILLS.filter(
        skill => skill.toLowerCase().includes(val.toLowerCase()) && 
        !userDetails.skills.includes(skill)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSkill = (skill: string) => {
    if (!userDetails.skills.includes(skill)) {
      setUserDetails({
        ...userDetails,
        skills: [...userDetails.skills, skill]
      });
    }
    setNewSkill('');
    setShowSuggestions(false);
  };

  const openModal = (type: 'edu' | 'exp' | 'cert' | 'skills' | 'basic', item: any = null) => {
    setModalType(type);
    setEditItem(item);
    setNewSkill('');
    setShowSuggestions(false);
  };

  const addSkill = () => {
    if (newSkill && !userDetails.skills.includes(newSkill)) {
      setUserDetails({
        ...userDetails,
        skills: [...userDetails.skills, newSkill]
      });
      setNewSkill('');
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setUserDetails({
      ...userDetails,
      skills: userDetails.skills.filter(s => s !== skillToRemove)
    });
  };

  const closeModal = () => {
    setModalType(null);
    setEditItem(null);
  };

  const handleDelete = (id: number) => {
    if (modalType === 'edu') setEducations(educations.filter(e => e.id !== id));
    if (modalType === 'exp') setExperiences(experiences.filter(e => e.id !== id));
    if (modalType === 'cert') setCertifications(certifications.filter(e => e.id !== id));
    closeModal();
  };

  const renderModal = () => {
    if (!modalType) return null;
    let title = '';
    if (modalType === 'skills') title = 'Manage Expertise';
    else if (editItem) title = `Edit ${modalType === 'edu' ? 'Education' : modalType === 'exp' ? 'Experience' : 'Certification'}`;
    else title = `Add New ${modalType === 'edu' ? 'Education' : modalType === 'exp' ? 'Experience' : 'Certification'}`;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal}></div>
        <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {modalType === 'basic' ? 'Edit Personal Information' : title}
            </h3>
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
          </div>
          
          <div className="p-8 max-h-[75vh] overflow-y-auto space-y-6">
            {/* BASIC INFO FORM (UserDetails Schema) */}
            {modalType === 'basic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" defaultValue={userDetails.firstName} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" defaultValue={userDetails.lastName} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                  <select defaultValue={userDetails.gender} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
                  <input type="date" defaultValue={userDetails.dateOfBirth} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bio (@db.Text)</label>
                  <textarea rows={3} defaultValue={userDetails.bio} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                  <input type="text" defaultValue={userDetails.address} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input type="text" defaultValue={userDetails.city} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Province</label>
                  <input type="text" defaultValue={userDetails.province} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                  <input type="text" defaultValue={userDetails.postalCode} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                  <input type="text" defaultValue={userDetails.country} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            )}

            {/* SKILLS MANAGEMENT */}
            {modalType === 'skills' && (
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newSkill}
                      onChange={(e) => handleSkillInputChange(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      onFocus={() => handleSkillInputChange(newSkill)}
                      placeholder="Search for skills (e.g. React)" 
                      className="flex-grow px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                    <button 
                      onClick={addSkill}
                      className="px-6 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* SEARCH DROPDOWN */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-[110] overflow-hidden max-h-48 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                      {filteredSuggestions.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => selectSkill(skill)}
                          className="w-full text-left px-5 py-3 hover:bg-blue-50 hover:text-blue-600 font-bold text-sm transition-colors border-b border-gray-50 last:border-0"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  {userDetails.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl border border-blue-100">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {userDetails.skills.length === 0 && (
                    <p className="text-gray-400 text-sm italic">No skills added yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* EDUCATION FORM */}
            {modalType === 'edu' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Institution</label>
                  <input type="text" defaultValue={editItem?.institution} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Degree</label>
                  <input type="text" defaultValue={editItem?.degree} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Field of Study</label>
                  <input type="text" defaultValue={editItem?.fieldOfStudy} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                  <input type="date" defaultValue={editItem?.startDate} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                  <input type="date" defaultValue={editItem?.endDate} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Grade (GPA)</label>
                  <input type="text" defaultValue={editItem?.grade} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="3.8 / 4.0" />
                </div>
                <div className="flex items-center gap-3 pt-8">
                  <input type="checkbox" defaultChecked={editItem?.isCurrent} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-bold text-gray-700">Currently Studying</span>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description (@db.Text)</label>
                  <textarea rows={3} defaultValue={editItem?.description} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Activities and societies..."></textarea>
                </div>
              </div>
            )}

            {/* EXPERIENCE FORM */}
            {modalType === 'exp' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input type="text" defaultValue={editItem?.companyName} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Position</label>
                  <input type="text" defaultValue={editItem?.position} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type</label>
                  <select defaultValue={editItem?.employmentType} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                    <option value="FULL_TIME">FULL_TIME</option>
                    <option value="PART_TIME">PART_TIME</option>
                    <option value="CONTRACT">CONTRACT</option>
                    <option value="TEMPORARY">TEMPORARY</option>
                    <option value="INTERN">INTERN</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location Type</label>
                  <select defaultValue={editItem?.locationType} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                    <option value="ONSITE">ONSITE</option>
                    <option value="REMOTE">REMOTE</option>
                    <option value="HYBRID">HYBRID</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location (String)</label>
                  <input type="text" defaultValue={editItem?.location} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Singapore, SG" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                  <input type="date" defaultValue={editItem?.startDate} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                  <input type="date" defaultValue={editItem?.endDate} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description (@db.Text)</label>
                  <textarea rows={3} defaultValue={editItem?.description} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
              </div>
            )}

            {/* CERTIFICATION FORM */}
            {modalType === 'cert' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input type="text" defaultValue={editItem?.name} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Issuing Organization</label>
                  <input type="text" defaultValue={editItem?.issuingOrganization} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Issue Date</label>
                  <input type="date" defaultValue={editItem?.issueDate} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                  <input type="date" defaultValue={editItem?.expiryDate} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Credential ID</label>
                  <input type="text" defaultValue={editItem?.credentialId} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Credential URL</label>
                  <input type="url" defaultValue={editItem?.credentialUrl} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description (@db.Text)</label>
                  <textarea rows={3} defaultValue={editItem?.description} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
              </div>
            )}
          </div>

          <div className="px-8 py-6 bg-gray-50 flex items-center justify-between">
            {editItem ? (
              <button onClick={() => handleDelete(editItem.id)} className="flex items-center gap-2 text-red-500 font-bold hover:text-red-700 transition-colors">
                <Trash2 size={18} /> Delete
              </button>
            ) : <div />}
            <div className="flex gap-3">
              <button onClick={closeModal} className="px-6 py-2.5 bg-white text-gray-600 font-bold rounded-xl border border-gray-200">Cancel</button>
              <button onClick={closeModal} className="px-8 py-2.5 bg-[#0052FF] text-white font-bold rounded-xl shadow-lg shadow-blue-200">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 font-sans">
      {renderModal()}
      
      {/* Profile Header */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-400"></div>
        <div className="px-10 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 -mt-16">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              <img src={userDetails.profilePhotoUrl} alt="Avatar" className="w-40 h-40 rounded-[2rem] border-8 border-white shadow-xl object-cover bg-white" />
              <div className="pb-2">
                <h1 className="text-3xl font-extrabold text-gray-900">{userDetails.firstName} {userDetails.lastName}</h1>
                <p className="text-[#0052FF] font-bold text-lg">{experiences[0]?.position || 'Job Seeker'}</p>
                <div className="flex items-center gap-4 text-gray-400 mt-3 text-sm font-medium">
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {userDetails.city}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={16} /> Joined Oct 2023</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => openModal('basic')}
                className="flex-grow md:flex-grow-0 px-6 py-3 bg-gray-50 text-gray-900 font-bold rounded-xl border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-2 justify-center"
              >
                <Edit3 size={18} /> Edit Basic
              </button>
              <button className="flex-grow md:flex-grow-0 px-6 py-3 bg-[#0052FF] text-white font-bold rounded-xl shadow-lg shadow-blue-200">
                <Download size={18} /> Download CV
              </button>
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-2">About Me</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{userDetails.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
            <div className="space-y-4">
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="p-2 bg-white text-blue-600 rounded-lg shadow-sm"><Mail size={18} /></div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{userDetails.email}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="p-2 bg-white text-blue-600 rounded-lg shadow-sm"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="text-sm font-bold text-gray-900">{userDetails.phone}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Expertise</h3>
              <button 
                onClick={() => openModal('skills')}
                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
              >
                <Edit3 size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {userDetails.skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-blue-50 text-blue-700 font-bold text-[10px] uppercase tracking-wider rounded-xl border border-blue-100">{skill}</span>
              ))}
              {userDetails.skills.length === 0 && (
                <p className="text-gray-400 text-sm italic">Add your skills to stand out.</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience List */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Briefcase className="text-[#0052FF]" /> Experience</h3>
              <button onClick={() => openModal('exp')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"><Plus size={20} /></button>
            </div>
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex gap-6 group relative">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-blue-600 border border-gray-100 flex-shrink-0">{exp.companyName[0]}</div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-xl">{exp.position}</h4>
                      <button onClick={() => openModal('exp', exp)} className="opacity-0 group-hover:opacity-100 p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"><Edit3 size={18} /></button>
                    </div>
                    <p className="text-gray-500 font-bold">{exp.companyName} • {exp.location}</p>
                    <p className="text-sm text-gray-400 font-medium mt-1">{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                    <p className="text-gray-600 mt-4 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education List */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><GraduationCap className="text-[#0052FF]" /> Education</h3>
              <button onClick={() => openModal('edu')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"><Plus size={20} /></button>
            </div>
            <div className="space-y-8">
              {educations.map((edu) => (
                <div key={edu.id} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 border border-gray-100 flex-shrink-0"><GraduationCap size={28} /></div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-xl">{edu.institution}</h4>
                      <button onClick={() => openModal('edu', edu)} className="opacity-0 group-hover:opacity-100 p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"><Edit3 size={18} /></button>
                    </div>
                    <p className="text-gray-500 font-bold">{edu.degree}, {edu.fieldOfStudy}</p>
                    <p className="text-sm text-gray-400 font-medium mt-1">{edu.startDate} - {edu.endDate}</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">GPA:</span>
                      <span className="text-sm font-extrabold text-blue-700">{edu.grade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications List */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Award className="text-[#0052FF]" /> Certifications</h3>
              <button onClick={() => openModal('cert')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"><Plus size={20} /></button>
            </div>
            <div className="space-y-8">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 border border-gray-100 flex-shrink-0"><Award size={28} /></div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-xl">{cert.name}</h4>
                      <button onClick={() => openModal('cert', cert)} className="opacity-0 group-hover:opacity-100 p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"><Edit3 size={18} /></button>
                    </div>
                    <p className="text-gray-500 font-bold">{cert.issuingOrganization}</p>
                    <p className="text-sm text-gray-400 font-medium mt-1">Issued {cert.issueDate}</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      {cert.credentialId && (
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                          <Bookmark size={14} /> ID: {cert.credentialId}
                        </div>
                      )}
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
                          <ExternalLink size={14} /> Verify Credential
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
