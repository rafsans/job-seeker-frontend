import React, { useState, useEffect } from 'react';
import { Award, Plus, X } from 'lucide-react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Textarea from '../../../components/Textarea';
import Select from '../../../components/Select';
import { getMasterSkills } from '../../../api/onboarding';

const SkillsCertificationsStep = ({ formData, setFormData }) => {
  const [masterSkills, setMasterSkills] = useState([]);
  const skills = formData.skills || [];
  const certifications = formData.certifications || [];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getMasterSkills();
        if (response && response.data) {
          const formatted = response.data.map(skill => ({
            value: skill.name,
            label: skill.name
          }));
          setMasterSkills(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch master skills:', err);
      }
    };
    fetchSkills();
  }, []);

  const removeSkill = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleCertChange = (index, field, value) => {
    const updatedCerts = [...certifications];
    updatedCerts[index] = { ...updatedCerts[index], [field]: value };
    setFormData(prev => ({ ...prev, certifications: updatedCerts }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [
        ...certifications,
        { name: '', issuingOrganization: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '', description: '' }
      ]
    }));
  };

  const removeCertification = (index) => {
    if (certifications.length === 1) return; // Keep at least one
    const updatedCerts = certifications.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, certifications: updatedCerts }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Skills Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Award className="text-blue-500" /> Skills & Expertise
        </h3>
        <div className="w-full">
          <Select
            placeholder="Select a skill..."
            options={masterSkills}
            value=""
            onChange={(e) => {
              const selectedSkill = e.target.value;
              if (selectedSkill && !skills.includes(selectedSkill)) {
                setFormData(prev => ({ ...prev, skills: [...prev.skills, selectedSkill] }));
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <span key={skill} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-full border border-blue-100 animate-in fade-in zoom-in duration-300">
              {skill}
              <button 
                type="button"
                onClick={() => removeSkill(skill)} 
                className="hover:text-blue-900 cursor-pointer"
              >
                <X size={16} />
              </button>
            </span>
          ))}
          {skills.length === 0 && (
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
          <Button 
            type="button"
            onClick={addCertification}
            variant="ghost" 
            size="sm" 
            className="text-[#0052FF] hover:text-blue-600 gap-1 font-semibold"
          >
            <Plus size={18} /> Add Certification
          </Button>
        </div>

        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6 relative"
          >
            {certifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Certification Name"
                  placeholder="AWS Certified Solutions Architect"
                  value={cert.name || ''}
                  onChange={(e) => handleCertChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <Input
                label="Issuing Organization"
                placeholder="Amazon Web Services"
                value={cert.issuingOrganization || ''}
                onChange={(e) => handleCertChange(index, 'issuingOrganization', e.target.value)}
                required
              />
              <Input
                type="date"
                label="Issue Date"
                value={cert.issueDate || ''}
                onChange={(e) => handleCertChange(index, 'issueDate', e.target.value)}
                required
              />
              <Input
                type="date"
                label="Expiration Date"
                value={cert.expiryDate || ''}
                onChange={(e) => handleCertChange(index, 'expiryDate', e.target.value)}
              />
              <Input
                label="Credential ID"
                placeholder="ABC-123-XYZ"
                value={cert.credentialId || ''}
                onChange={(e) => handleCertChange(index, 'credentialId', e.target.value)}
              />
              <Input
                type="url"
                label="Credential URL"
                placeholder="https://..."
                value={cert.credentialUrl || ''}
                onChange={(e) => handleCertChange(index, 'credentialUrl', e.target.value)}
                containerClassName="md:col-span-2"
              />
              <Textarea
                label="Description"
                placeholder="About the certification..."
                value={cert.description || ''}
                onChange={(e) => handleCertChange(index, 'description', e.target.value)}
                containerClassName="md:col-span-2"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCertificationsStep;
