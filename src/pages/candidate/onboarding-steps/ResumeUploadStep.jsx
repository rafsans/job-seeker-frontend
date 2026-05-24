import React, { useState } from 'react';
import { FileText, Upload, File, CheckCircle2, Loader2 } from 'lucide-react';
import { uploadResume } from '../../../api/onboarding';
import { toast } from 'react-hot-toast';

const ResumeUploadStep = ({ formData, setFormData }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds the 5MB limit.');
      return;
    }

    const fileData = new FormData();
    fileData.append('resume', file);

    setUploading(true);
    try {
      const response = await uploadResume(fileData);
      const url = response.data?.resume_url;
      setFormData(prev => ({
        ...prev,
        resumeUrl: url,
        resumeFileName: file.name
      }));
      toast.success('Resume uploaded successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Upload your Resume</h3>
        <p className="text-gray-500 mt-2">Upload your CV to let recruiters know more about you.</p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-blue-400 transition-all group cursor-pointer bg-gray-50/50 relative">
          <input 
            type="file" 
            className="hidden" 
            id="resume-upload" 
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label htmlFor="resume-upload" className="cursor-pointer block">
            {uploading ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2 className="animate-spin text-blue-500" size={40} />
                <p className="text-lg font-bold text-gray-900 mt-4">Uploading your resume...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="text-blue-500" size={32} />
                </div>
                <p className="text-lg font-bold text-gray-900">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400 mt-1 uppercase font-bold tracking-widest">PDF, DOC, DOCX (Max 5MB)</p>
              </>
            )}
          </label>
        </div>

        {formData.resumeFileName && (
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex items-center gap-4 border border-blue-100 animate-in fade-in zoom-in duration-300">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                <File size={20} />
             </div>
             <div className="flex-grow">
                <p className="text-sm font-bold text-gray-900">{formData.resumeFileName}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Uploaded successfully</p>
             </div>
             <CheckCircle2 className="text-green-500" size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploadStep;
