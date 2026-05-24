import React from 'react';
import { Briefcase, Plus, X } from 'lucide-react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import Textarea from '../../../components/Textarea';

const ExperienceStep = ({ formData, setFormData }) => {
  const experience = formData.experience || [];

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...experience];
    updatedExp[index] = { ...updatedExp[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: updatedExp }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...experience,
        { companyName: '', position: '', employmentType: '', location: '', locationType: '', startDate: '', endDate: '', isCurrent: false, description: '', achievement: '' }
      ]
    }));
  };

  const removeExperience = (index) => {
    if (experience.length === 1) return; // Keep at least one
    const updatedExp = experience.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, experience: updatedExp }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="text-blue-500" /> Work Experience
        </h3>
        <Button 
          type="button"
          onClick={addExperience}
          variant="ghost" 
          size="sm" 
          className="text-[#0052FF] hover:text-blue-600 gap-1 font-semibold"
        >
          <Plus size={18} /> Add Experience
        </Button>
      </div>

      {experience.map((exp, index) => (
        <div 
          key={index} 
          className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative space-y-6"
        >
          {experience.length > 1 && (
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Company Name"
              placeholder="Google Inc."
              value={exp.companyName || ''}
              onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
              required
            />
            <Input
              label="Position"
              placeholder="Software Engineer"
              value={exp.position || ''}
              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              required
            />
            <Select
              label="Employment Type"
              placeholder="Select Employment Type"
              value={exp.employmentType || ''}
              onChange={(e) => handleExperienceChange(index, 'employmentType', e.target.value)}
              options={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Contract', label: 'Contract' },
                { value: 'Internship', label: 'Internship' },
              ]}
              required
            />
            <Select
              label="Location Type"
              placeholder="Select Location Type"
              value={exp.locationType || ''}
              onChange={(e) => handleExperienceChange(index, 'locationType', e.target.value)}
              options={[
                { value: 'On-site', label: 'On-site' },
                { value: 'Remote', label: 'Remote' },
                { value: 'Hybrid', label: 'Hybrid' },
              ]}
              required
            />
            <Input
              label="Location"
              placeholder="Singapore, SG"
              value={exp.location || ''}
              onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
              containerClassName="md:col-span-2"
              required
            />
            <Input
              type="date"
              label="Start Date"
              value={exp.startDate || ''}
              onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
              required
            />
            <Input
              type="date"
              label="End Date"
              value={exp.endDate || ''}
              onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
              disabled={exp.isCurrent}
            />
            <div className="flex items-center gap-2 md:col-span-2 py-2">
              <input 
                type="checkbox" 
                id={`currWork-${index}`} 
                checked={exp.isCurrent || false}
                onChange={(e) => handleExperienceChange(index, 'isCurrent', e.target.checked)}
                className="w-5 h-5 accent-blue-600 cursor-pointer" 
              />
              <label 
                htmlFor={`currWork-${index}`} 
                className="text-sm text-gray-600 font-medium cursor-pointer select-none"
              >
                I am currently working here
              </label>
            </div>
            <Textarea
              label="Description"
              placeholder="Responsibilities and role..."
              value={exp.description || ''}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              containerClassName="md:col-span-2"
            />
            <Textarea
              label="Achievements"
              placeholder="Key accomplishments..."
              value={exp.achievement || ''}
              onChange={(e) => handleExperienceChange(index, 'achievement', e.target.value)}
              containerClassName="md:col-span-2"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceStep;
