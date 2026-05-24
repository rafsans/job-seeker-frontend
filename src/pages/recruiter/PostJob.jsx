import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Job Posting' : 'Post a New Job'}</h1>
          <p className="text-gray-500 mt-1 font-medium">{isEdit ? 'Update your existing job details.' : 'Fill in the details below to find your next great hire.'}</p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard/recruiter/manage-jobs'); }}>
        {/* Basic Information */}
        <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Info className="text-blue-500" size={20} /> Basic Information
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
              <input type="text" placeholder="e.g. Senior Software Engineer" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type (Enum)</label>
                <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium">
                  <option value="FULL_TIME">FULL_TIME</option>
                  <option value="PART_TIME">PART_TIME</option>
                  <option value="CONTRACT">CONTRACT</option>
                  <option value="TEMPORARY">TEMPORARY</option>
                  <option value="INTERN">INTERN</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location Type (Enum)</label>
                <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium">
                  <option value="ONSITE">ONSITE</option>
                  <option value="REMOTE">REMOTE</option>
                  <option value="HYBRID">HYBRID</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Location (City, Country)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Singapore" className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
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
              <input type="text" defaultValue="USD" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-center" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Min Salary (Decimal)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="number" step="0.01" placeholder="5000.00" className="w-full pl-10 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Max Salary (Decimal)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="number" step="0.01" placeholder="8000.00" className="w-full pl-10 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Briefcase size={16} /> Experience Level
              </label>
              <input type="text" placeholder="e.g. 5+ years" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <GraduationCap size={16} /> Education Level
              </label>
              <input type="text" placeholder="e.g. Bachelor's Degree" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} /> Deadline
              </label>
              <input type="date" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
            </div>
            <div className="flex items-end pb-3.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="font-bold text-gray-700">Active Listing</span>
              </label>
            </div>
          </div>
        </section>

        {/* Job Skills (Schema Relation) */}
        <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="text-blue-500" size={20} /> Required Skills (JobSkills)
          </h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="e.g. React, TypeScript, Figma" 
              className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" 
            />
            <button 
              type="button"
              onClick={addSkill}
              className="px-6 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <Plus size={20} /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl border border-blue-100">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="hover:text-blue-900 transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
            {skills.length === 0 && <p className="text-gray-400 text-sm italic">Add at least one skill requirement.</p>}
          </div>
        </section>

        {/* Long Text Fields */}
        <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Content Details</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description (@db.Text)</label>
              <textarea rows={5} placeholder="General job overview..." className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Requirements (@db.Text)</label>
              <textarea rows={5} placeholder="Technical requirements..." className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Responsibilities (@db.Text)</label>
              <textarea rows={5} placeholder="Daily responsibilities..." className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Benefits (@db.Text)</label>
              <textarea rows={5} placeholder="Perks and benefits..." className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"></textarea>
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
          <button type="submit" className="px-10 py-3.5 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
            {isEdit ? 'Update Posting' : 'Publish Job'} <Save size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
