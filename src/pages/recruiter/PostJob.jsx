import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Save,
  Info,
  Layers,
  GraduationCap,
  Plus,
  X,
  Award,
  Loader2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../../api/jobs';
import { createRecruiterJob, updateRecruiterJob } from '../../api/recruiter';
import { getAllSkills } from '../../api/candidateProfile';
import { getAllCategories } from '../../api/master';
import Select from '../../components/Select';

// Helper to convert date to YYYY-MM-DD
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Form fields state (mapping to backend validation schema keys)
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState(['']);
  const [responsibilities, setResponsibilities] = useState(['']);
  const [benefits, setBenefits] = useState(['']);
  const [employmentType, setEmploymentType] = useState('FULL_TIME');
  const [locationType, setLocationType] = useState('ONSITE');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Skills & Categories states
  const [selectedSkills, setSelectedSkills] = useState([]); // Array of { id, name }
  const [masterSkills, setMasterSkills] = useState([]);
  const [masterCategories, setMasterCategories] = useState([]);

  // Status states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load master skills and job detail (if edit mode)
  useEffect(() => {
    const initData = async () => {
      try {
        // Fetch all master skills & categories
        const [masterSkillsData, categoriesData] = await Promise.all([
          getAllSkills(),
          getAllCategories().catch(() => []) // fallback if fails
        ]);
        setMasterSkills(Array.isArray(masterSkillsData) ? masterSkillsData : []);
        setMasterCategories(Array.isArray(categoriesData) ? categoriesData : []);

        if (isEdit) {
          // Fetch job details by ID using the public details endpoint
          const jobRes = await getJobById(id);
          const job = jobRes.data;
          
          if (job) {
            setJobTitle(job.title || '');
            setDescription(job.description || '');
            
            const formatArray = (arr) => {
              if (Array.isArray(arr) && arr.length > 0) {
                return arr.map(i => typeof i === 'string' ? i : i.item).filter(i => i);
              }
              return [''];
            };
            
            setRequirements(formatArray(job.requirements));
            setResponsibilities(formatArray(job.responsibilities));
            setBenefits(formatArray(job.benefits));
            setEmploymentType(job.employmentType || 'FULL_TIME');
            setLocationType(job.locationType || 'ONSITE');
            setLocation(job.location || '');
            setMinSalary(job.salaryMin ? String(job.salaryMin) : '');
            setMaxSalary(job.salaryMax ? String(job.salaryMax) : '');
            setCurrency(job.currency || 'USD');
            setExperienceLevel(job.experienceLevel || '');
            setEducationLevel(job.educationLevel || '');
            setCategoryId(job.categoryId ? String(job.categoryId) : '');
            setDeadline(formatDate(job.deadLine));
            setIsActive(job.isActive !== undefined ? job.isActive : true);

            // Populate selected skills
            if (job.jobSkills && Array.isArray(job.jobSkills)) {
              const mapped = job.jobSkills
                .filter(js => js.skill)
                .map(js => ({ id: js.skill.id, name: js.skill.name }));
              setSelectedSkills(mapped);
            }
          }
        } else {
          // Reset form to default values when entering Post Job mode
          setJobTitle('');
          setDescription('');
          setRequirements(['']);
          setResponsibilities(['']);
          setBenefits(['']);
          setEmploymentType('FULL_TIME');
          setLocationType('ONSITE');
          setLocation('');
          setMinSalary('');
          setMaxSalary('');
          setCurrency('USD');
          setExperienceLevel('');
          setEducationLevel('');
          setCategoryId('');
          setDeadline('');
          setIsActive(true);
          setSelectedSkills([]);
        }
      } catch (err) {
        console.error('Error initializing post/edit job page:', err);
        setErrorMessage('Failed to load job detail or skills data.');
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [id, isEdit]);

  // Handle skill adding from master list
  const addSkill = (skill) => {
    if (!selectedSkills.find(s => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillId) => {
    setSelectedSkills(selectedSkills.filter(s => s.id !== skillId));
  };

  // Handle Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!jobTitle.trim()) return setErrorMessage('Job Title is required');
    if (!description.trim()) return setErrorMessage('Description is required');
    if (requirements.filter(r => r.trim()).length === 0) return setErrorMessage('At least one requirement is required');
    if (responsibilities.filter(r => r.trim()).length === 0) return setErrorMessage('At least one responsibility is required');
    if (benefits.filter(r => r.trim()).length === 0) return setErrorMessage('At least one benefit is required');
    if (!location.trim()) return setErrorMessage('Location is required');
    if (!minSalary) return setErrorMessage('Minimum salary is required');
    if (!maxSalary) return setErrorMessage('Maximum salary is required');
    if (!experienceLevel.trim()) return setErrorMessage('Experience level is required');
    if (!educationLevel.trim()) return setErrorMessage('Education level is required');
    if (!deadline) return setErrorMessage('Deadline is required');

    setSubmitting(true);

    // Build the request payload (snake_case expected by zod validation)
    const payload = {
      job_title: jobTitle,
      description,
      requirements: requirements.map(r => r.trim()).filter(r => r),
      responsibilities: responsibilities.map(r => r.trim()).filter(r => r),
      benefits: benefits.map(r => r.trim()).filter(r => r),
      employment_type: employmentType,
      location_type: locationType,
      location,
      min_salary: parseFloat(minSalary),
      max_salary: parseFloat(maxSalary),
      currency,
      experience_level: experienceLevel,
      education_level: educationLevel,
      category_id: categoryId ? parseInt(categoryId) : undefined,
      deadline,
      skills: selectedSkills.map(s => s.id),
      isActive
    };

    try {
      if (isEdit) {
        await updateRecruiterJob(id, payload);
      } else {
        await createRecruiterJob(payload);
      }
      navigate('/dashboard/recruiter/manage-jobs');
    } catch (err) {
      console.error('Failed to post/edit job:', err);
      const msg = err.response?.data?.message || 'Something went wrong. Please check your inputs.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading form details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Job Posting' : 'Post a New Job'}</h1>
          <p className="text-gray-500 mt-1 font-medium">
            {isEdit ? 'Update your existing job details.' : 'Fill in the details below to find your next great hire.'}
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold">
          {errorMessage}
        </div>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Info className="text-blue-500" size={20} /> Basic Information
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
              <input 
                type="text" 
                placeholder="e.g. Senior Software Engineer" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Employment Type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                options={[
                  { value: 'FULL_TIME', label: 'Full-time' },
                  { value: 'PART_TIME', label: 'Part-time' },
                  { value: 'CONTRACT', label: 'Contract' },
                  { value: 'TEMPORARY', label: 'Temporary' },
                  { value: 'INTERN', label: 'Internship' },
                  { value: 'OTHER', label: 'Other' },
                ]}
              />
              <Select
                label="Location Type"
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
                options={[
                  { value: 'ONSITE', label: 'On-site' },
                  { value: 'REMOTE', label: 'Remote' },
                  { value: 'HYBRID', label: 'Hybrid' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Job Category"
                placeholder="Select Category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                options={masterCategories.map(cat => ({ value: String(cat.id), label: cat.name }))}
              />

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Location (City, Country)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="e.g. Singapore" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Compensation & Levels */}
        <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="text-blue-500" size={20} /> Compensation & Levels
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
              <input 
                type="text" 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-center" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Min Salary</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="5000.00" 
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Max Salary</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="8000.00" 
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Briefcase size={16} /> Experience Level
              </label>
              <input 
                type="text" 
                placeholder="e.g. 5+ years" 
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <GraduationCap size={16} /> Education Level
              </label>
              <input 
                type="text" 
                placeholder="e.g. Bachelor's Degree" 
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} /> Deadline
              </label>
              <input 
                type="date" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
              />
            </div>
            <div className="flex items-end pb-3.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="font-bold text-gray-700">Active Listing</span>
              </label>
            </div>
          </div>
        </section>

        {/* Job Skills */}
        <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="text-blue-500" size={20} /> Required Skills
          </h3>
          <div>
            <Select 
              placeholder="Choose a skill..."
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  const skill = masterSkills.find(s => String(s.id) === val);
                  if (skill) {
                    addSkill(skill);
                  }
                }
              }}
              options={masterSkills
                .filter(s => !selectedSkills.find(sel => sel.id === s.id))
                .map(skill => ({
                  value: String(skill.id),
                  label: skill.name
                }))
              }
            />
          </div>

          {/* Selected Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedSkills.map(skill => (
              <span key={skill.id} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl border border-blue-100">
                {skill.name}
                <button type="button" onClick={() => removeSkill(skill.id)} className="hover:text-blue-900 transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
            {selectedSkills.length === 0 && (
              <p className="text-gray-400 text-sm italic">Select at least one skill requirement from the dropdown above.</p>
            )}
          </div>
        </section>

        {/* Content Details */}
        <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Content Details</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                rows={5} 
                placeholder="General job overview..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Requirements</label>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. 3+ years of React experience" 
                      value={req}
                      onChange={(e) => {
                        const newReqs = [...requirements];
                        newReqs[index] = e.target.value;
                        setRequirements(newReqs);
                      }}
                      className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (requirements.length > 1) {
                          setRequirements(requirements.filter((_, i) => i !== index));
                        } else {
                          setRequirements(['']);
                        }
                      }}
                      className="p-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 bg-gray-50 rounded-2xl transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                onClick={() => setRequirements([...requirements, ''])}
                className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus size={16} /> Add Requirement
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Responsibilities</label>
              <div className="space-y-3">
                {responsibilities.map((resp, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Develop new user-facing features" 
                      value={resp}
                      onChange={(e) => {
                        const newResps = [...responsibilities];
                        newResps[index] = e.target.value;
                        setResponsibilities(newResps);
                      }}
                      className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (responsibilities.length > 1) {
                          setResponsibilities(responsibilities.filter((_, i) => i !== index));
                        } else {
                          setResponsibilities(['']);
                        }
                      }}
                      className="p-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 bg-gray-50 rounded-2xl transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                onClick={() => setResponsibilities([...responsibilities, ''])}
                className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus size={16} /> Add Responsibility
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Benefits</label>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Health Insurance, Remote Work" 
                      value={benefit}
                      onChange={(e) => {
                        const newBens = [...benefits];
                        newBens[index] = e.target.value;
                        setBenefits(newBens);
                      }}
                      className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (benefits.length > 1) {
                          setBenefits(benefits.filter((_, i) => i !== index));
                        } else {
                          setBenefits(['']);
                        }
                      }}
                      className="p-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 bg-gray-50 rounded-2xl transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button" 
                onClick={() => setBenefits([...benefits, ''])}
                className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus size={16} /> Add Benefit
              </button>
            </div>
          </div>
        </section>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="px-8 py-3.5 bg-white text-gray-600 font-bold rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={submitting}
            className="px-10 py-3.5 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              <>
                {isEdit ? 'Update Posting' : 'Publish Job'} <Save size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
