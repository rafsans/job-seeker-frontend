import React, { useState, useEffect } from 'react';
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
  Bookmark,
  Loader2,
} from 'lucide-react';
import {
  getCandidateProfile,
  getEducations,
  getExperiences,
  getCandidateSkills,
  getAllSkills,
  addSkill,
  removeSkill as removeSkillApi,
  getCertifications,
  updateCandidateProfile,
  createEducation, updateEducation, deleteEducation,
  createExperience, updateExperience, deleteExperience,
  createCertification, updateCertification, deleteCertification,
} from '../../api/candidateProfile';
import { toast } from 'react-hot-toast';

const JobSeekerProfile = () => {
  const [modalType, setModalType] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  // ─── API State ───────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState(null);       // profile.personal, profile.user
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);           // [{ id, skill: { id, name } }]
  const [masterSkills, setMasterSkills] = useState([]); // [{ id, name }]
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── Skill autocomplete ──────────────────────────────────────────────────────
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ─── Fetch all data ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [profileData, eduData, expData, skillData, masterData, certData] =
          await Promise.all([
            getCandidateProfile(),
            getEducations(),
            getExperiences(),
            getCandidateSkills(),
            getAllSkills(),
            getCertifications(),
          ]);
        setProfile(profileData);
        setEducations(eduData || []);
        setExperiences(expData || []);
        setSkills(skillData || []);
        setMasterSkills(masterData || []);
        setCertifications(certData || []);
      } catch (err) {
        console.error('Failed to load profile data:', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ─── Derived shorthand ───────────────────────────────────────────────────────
  const personal = profile?.profile?.personal || {};
  const userInfo  = profile?.user || {};

  // ─── Skill helpers ───────────────────────────────────────────────────────────
  // API returns flat: { id, name } for userSkills, and { id, name } for master skills
  const currentSkillNames = skills.map((s) => s.name?.toLowerCase());

  const handleSkillInputChange = (val) => {
    setNewSkill(val);
    if (val.trim()) {
      const filtered = masterSkills.filter(
        (sk) =>
          sk.name.toLowerCase().includes(val.toLowerCase()) &&
          !currentSkillNames.includes(sk.name.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleAddSkill = async (skillId) => {
    try {
      await addSkill([skillId]);
      const updated = await getCandidateSkills();
      setSkills(updated || []);
    } catch (err) {
      console.error('Failed to add skill:', err);
    }
    setNewSkill('');
    setShowSuggestions(false);
  };

  const handleRemoveSkill = async (userSkillId) => {
    try {
      await removeSkillApi(userSkillId);
      const updated = await getCandidateSkills();
      setSkills(updated || []);
    } catch (err) {
      console.error('Failed to remove skill:', err);
    }
  };

  // ─── Modal helpers ───────────────────────────────────────────────────────────
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setNewSkill('');
    setShowSuggestions(false);
  };

  const closeModal = () => {
    setModalType(null);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    try {
      if (modalType === 'edu') {
        await deleteEducation(id);
        setEducations(educations.filter((e) => e.id !== id));
      }
      if (modalType === 'exp') {
        await deleteExperience(id);
        setExperiences(experiences.filter((e) => e.id !== id));
      }
      if (modalType === 'cert') {
        await deleteCertification(id);
        setCertifications(certifications.filter((e) => e.id !== id));
      }
      toast.success('Successfully deleted!');
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete item.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    // Parse boolean for checkbox
    if (modalType === 'edu' || modalType === 'exp') {
      data.is_current = fd.get('is_current') === 'on';
    }

    try {
      if (modalType === 'basic') {
        // Need to structure basic info as expected by profile schema
        await updateCandidateProfile(data);
        const updated = await getCandidateProfile();
        setProfile(updated);
      } else if (modalType === 'edu') {
        if (editItem) {
          await updateEducation(editItem.id, data);
        } else {
          await createEducation(data);
        }
        const updated = await getEducations();
        setEducations(updated || []);
      } else if (modalType === 'exp') {
        if (editItem) {
          await updateExperience(editItem.id, data);
        } else {
          await createExperience(data);
        }
        const updated = await getExperiences();
        setExperiences(updated || []);
      } else if (modalType === 'cert') {
        if (editItem) {
          await updateCertification(editItem.id, data);
        } else {
          await createCertification(data);
        }
        const updated = await getCertifications();
        setCertifications(updated || []);
      }
      toast.success('Successfully saved changes.');
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save changes.');
    }
  };

  // ─── Loading / Error ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="ml-4 text-gray-600 text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // ─── Modal ───────────────────────────────────────────────────────────────────
  const renderModal = () => {
    if (!modalType) return null;
    let title = '';
    if (modalType === 'skills') title = 'Manage Expertise';
    else if (editItem)
      title = `Edit ${modalType === 'edu' ? 'Education' : modalType === 'exp' ? 'Experience' : 'Certification'}`;
    else
      title = `Add New ${modalType === 'edu' ? 'Education' : modalType === 'exp' ? 'Experience' : 'Certification'}`;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
        <form onSubmit={handleSave} className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {modalType === 'basic' ? 'Edit Personal Information' : title}
            </h3>
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 max-h-[75vh] overflow-y-auto space-y-6">
            {/* BASIC INFO FORM */}
            {modalType === 'basic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" name="firstname" defaultValue={personal.firstname} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" name="lastname" defaultValue={personal.lastname} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  <input type="text" name="phone" defaultValue={personal.phone} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                  <input type="text" name="country" defaultValue={personal.country} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                  <input type="text" name="address" defaultValue={personal.address} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input type="text" name="city" defaultValue={personal.city} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Province</label>
                  <input type="text" name="province" defaultValue={personal.province} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                  <input type="text" name="postalCode" defaultValue={personal.postalCode} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
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
                      onFocus={() => handleSkillInputChange(newSkill)}
                      placeholder="Search for skills (e.g. React)"
                      className="flex-grow px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-[110] overflow-hidden max-h-48 overflow-y-auto">
                      {filteredSuggestions.map((sk) => (
                        <button
                          key={sk.id}
                          onClick={() => handleAddSkill(sk.id)}
                          className="w-full text-left px-5 py-3 hover:bg-blue-50 hover:text-blue-600 font-bold text-sm transition-colors border-b border-gray-50 last:border-0"
                        >
                          {sk.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  {skills.map((us) => (
                    <span
                      key={us.id}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl border border-blue-100"
                    >
                      {us.name}
                      <button onClick={() => handleRemoveSkill(us.id)} className="hover:text-blue-900">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {skills.length === 0 && (
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
                  <input type="text" name="institution" defaultValue={editItem?.institution} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Degree</label>
                  <input type="text" name="degree" defaultValue={editItem?.degree} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Field of Study</label>
                  <input type="text" name="field_of_study" defaultValue={editItem?.fieldOfStudy} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                  <input type="date" name="start_date" defaultValue={editItem?.startDate?.split('T')[0]} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                  <input type="date" name="end_date" defaultValue={editItem?.endDate?.split('T')[0]} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Grade (GPA)</label>
                  <input type="text" name="grade" defaultValue={editItem?.grade} placeholder="3.8 / 4.0" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="flex items-center gap-3 pt-8">
                  <input type="checkbox" name="is_current" defaultChecked={editItem?.isCurrent} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-bold text-gray-700">Currently Studying</span>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea rows={3} name="description" defaultValue={editItem?.description} placeholder="Activities and societies..." className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            )}

            {/* EXPERIENCE FORM */}
            {modalType === 'exp' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input type="text" name="company" defaultValue={editItem?.companyName} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Position</label>
                  <input type="text" name="position" defaultValue={editItem?.position} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type</label>
                  <select name="employment_type" defaultValue={editItem?.employmentType} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="INTERN">Internship</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location Type</label>
                  <select name="location_type" defaultValue={editItem?.locationType} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                    <option value="ONSITE">On-site</option>
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                  <input type="text" name="location" defaultValue={editItem?.location} placeholder="Singapore, SG" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                  <input type="date" name="start_date" defaultValue={editItem?.startDate?.split('T')[0]} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                  <input type="date" name="end_date" defaultValue={editItem?.endDate?.split('T')[0]} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="flex items-center gap-3 pt-8">
                  <input type="checkbox" name="is_current" defaultChecked={editItem?.isCurrent} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-bold text-gray-700">Currently Working Here</span>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea rows={3} name="description" defaultValue={editItem?.description} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            )}

            {/* CERTIFICATION FORM */}
            {modalType === 'cert' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input type="text" name="name" defaultValue={editItem?.name} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Issuing Organization</label>
                  <input type="text" name="issuingOrganization" defaultValue={editItem?.issuingOrganization} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Issue Date</label>
                  <input type="date" name="issueDate" defaultValue={editItem?.issueDate?.split('T')[0]} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                  <input type="date" name="expiryDate" defaultValue={editItem?.expiryDate?.split('T')[0]} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Credential ID</label>
                  <input type="text" name="credentialId" defaultValue={editItem?.credentialId} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Credential URL</label>
                  <input type="url" name="credentialUrl" defaultValue={editItem?.credentialUrl} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea rows={3} name="description" defaultValue={editItem?.description} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            )}
          </div>

          <div className="px-8 py-6 bg-gray-50 flex items-center justify-between">
            {editItem ? (
              <button
                onClick={() => handleDelete(editItem.id)}
                className="flex items-center gap-2 text-red-500 font-bold hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} /> Delete
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2.5 bg-white text-gray-600 font-bold rounded-xl border border-gray-200">
                Cancel
              </button>
              {modalType !== 'skills' && (
                <button type="submit" className="px-8 py-2.5 bg-[#0052FF] text-white font-bold rounded-xl shadow-lg shadow-blue-200">
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 font-sans">
      {renderModal()}

      {/* Profile Header */}
      <div className="pb-4">

        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              <div className="w-40 h-40 rounded-[2rem] border-8 border-white shadow-xl bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-extrabold">
                {(personal.firstname?.[0] || userInfo.email?.[0] || '?').toUpperCase()}
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {personal.firstname
                    ? `${personal.firstname} ${personal.lastname || ''}`
                    : userInfo.email}
                </h1>
                <p className="text-[#0052FF] font-bold text-lg">
                  {experiences[0]?.position || 'Job Seeker'}
                </p>
                <div className="flex items-center gap-4 text-gray-400 mt-3 text-sm font-medium">
                  {personal.city && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} /> {personal.city}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar size={16} /> Member
                  </span>
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
              {personal.resume_url && (
                <a
                  href={personal.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow md:flex-grow-0 px-6 py-3 bg-[#0052FF] text-white font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 justify-center"
                >
                  <Download size={18} /> Download CV
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Contact */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="p-2 bg-white text-blue-600 rounded-lg shadow-sm">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{userInfo.email}</p>
                </div>
              </div>
              {personal.phone && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="p-2 bg-white text-blue-600 rounded-lg shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="text-sm font-bold text-gray-900">{personal.phone}</p>
                  </div>
                </div>
              )}
              {personal.city && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="p-2 bg-white text-blue-600 rounded-lg shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-gray-900">
                      {[personal.city, personal.province, personal.country].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
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
              {skills.map((us) => (
                <span
                  key={us.id}
                  className="px-4 py-2 bg-blue-50 text-blue-700 font-bold text-[10px] uppercase tracking-wider rounded-xl border border-blue-100"
                >
                  {us.name}
                </span>
              ))}
              {skills.length === 0 && (
                <p className="text-gray-400 text-sm italic">Add your skills to stand out.</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase className="text-[#0052FF]" /> Experience
              </h3>
              <button onClick={() => openModal('exp')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-10">
              {experiences.length === 0 && (
                <p className="text-gray-400 text-sm italic">No experience added yet.</p>
              )}
              {experiences.map((exp) => (
                <div key={exp.id} className="flex gap-6 group relative">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-blue-600 border border-gray-100 flex-shrink-0">
                    {(exp.companyName || 'C')[0]}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-xl">{exp.position}</h4>
                      <button
                        onClick={() => openModal('exp', exp)}
                        className="opacity-0 group-hover:opacity-100 p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 font-bold">
                      {exp.companyName} {exp.location && `• ${exp.location}`}
                    </p>
                    <p className="text-sm text-gray-400 font-medium mt-1">
                      {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}{' '}
                      — {exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                    </p>
                    {exp.description && (
                      <p className="text-gray-600 mt-4 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <GraduationCap className="text-[#0052FF]" /> Education
              </h3>
              <button onClick={() => openModal('edu')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-8">
              {educations.length === 0 && (
                <p className="text-gray-400 text-sm italic">No education added yet.</p>
              )}
              {educations.map((edu) => (
                <div key={edu.id} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 border border-gray-100 flex-shrink-0">
                    <GraduationCap size={28} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-xl">{edu.institution}</h4>
                      <button
                        onClick={() => openModal('edu', edu)}
                        className="opacity-0 group-hover:opacity-100 p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 font-bold">
                      {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    </p>
                    <p className="text-sm text-gray-400 font-medium mt-1">
                      {edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}{' '}
                      — {edu.isCurrent ? 'Present' : edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                    </p>
                    {edu.grade && (
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">GPA:</span>
                        <span className="text-sm font-extrabold text-blue-700">{edu.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Award className="text-[#0052FF]" /> Certifications
              </h3>
              <button onClick={() => openModal('cert')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-8">
              {certifications.length === 0 && (
                <p className="text-gray-400 text-sm italic">No certifications added yet.</p>
              )}
              {certifications.map((cert) => (
                <div key={cert.id} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 border border-gray-100 flex-shrink-0">
                    <Award size={28} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 text-xl">{cert.name}</h4>
                      <button
                        onClick={() => openModal('cert', cert)}
                        className="opacity-0 group-hover:opacity-100 p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 font-bold">{cert.issuingOrganization}</p>
                    {cert.issueDate && (
                      <p className="text-sm text-gray-400 font-medium mt-1">
                        Issued {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-4">
                      {cert.credentialId && (
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                          <Bookmark size={14} /> ID: {cert.credentialId}
                        </div>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
                        >
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
