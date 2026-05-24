import React from 'react';
import { GraduationCap, Plus, X } from 'lucide-react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Textarea from '../../../components/Textarea';

const EducationStep = ({ formData, setFormData }) => {
  const education = formData.education || [];

  const handleEducationChange = (index, field, value) => {
    const updatedEdu = [...education];
    updatedEdu[index] = { ...updatedEdu[index], [field]: value };
    setFormData(prev => ({ ...prev, education: updatedEdu }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...education,
        { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', isCurrent: false, grade: '', description: '' }
      ]
    }));
  };

  const removeEducation = (index) => {
    if (education.length === 1) return; // Keep at least one
    const updatedEdu = education.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, education: updatedEdu }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="text-blue-500" /> Education History
        </h3>
        <Button 
          type="button"
          onClick={addEducation}
          variant="ghost" 
          size="sm"
          className="text-[#0052FF] hover:text-blue-600 gap-1 font-semibold"
        >
          <Plus size={18} /> Add Education
        </Button>
      </div>

      {education.map((edu, index) => (
        <div 
          key={index} 
          className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative space-y-6"
        >
          {education.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Institution / University"
                placeholder="University of Indonesia"
                value={edu.institution || ''}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                required
              />
            </div>
            <Input
              label="Degree"
              placeholder="Bachelor's Degree"
              value={edu.degree || ''}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              required
            />
            <Input
              label="Field of Study"
              placeholder="Computer Science"
              value={edu.fieldOfStudy || ''}
              onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
              required
            />
            <Input
              type="date"
              label="Start Date"
              value={edu.startDate || ''}
              onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
              required
            />
            <Input
              type="date"
              label="End Date"
              value={edu.endDate || ''}
              onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
              disabled={edu.isCurrent}
            />
            <div className="flex items-center gap-2 md:col-span-2 py-2">
              <input 
                type="checkbox" 
                id={`currEdu-${index}`} 
                checked={edu.isCurrent || false}
                onChange={(e) => handleEducationChange(index, 'isCurrent', e.target.checked)}
                className="w-5 h-5 accent-blue-600 cursor-pointer" 
              />
              <label 
                htmlFor={`currEdu-${index}`} 
                className="text-sm text-gray-600 font-medium cursor-pointer select-none"
              >
                I am currently studying here
              </label>
            </div>
            <Input
              label="Grade (GPA)"
              placeholder="3.8 / 4.0"
              value={edu.grade || ''}
              onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
            />
            <Textarea
              label="Description"
              placeholder="Activities and societies..."
              value={edu.description || ''}
              onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
              containerClassName="md:col-span-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationStep;
