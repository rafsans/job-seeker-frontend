import React from 'react';
import { 
  FileText, 
  Upload, 
  Trash2, 
  Download, 
  ExternalLink, 
  Clock
} from 'lucide-react';

const ResumeManagement = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resume Management</h1>
        <p className="text-gray-500 mt-1 font-medium">Manage and update your curriculum vitae for job applications.</p>
      </div>

      <div className="max-w-4xl animate-in fade-in duration-500">
        {/* Main Content: Current Resume */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">Current Resume</h3>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-lg">Default</span>
            </div>

            <div className="p-8 border-2 border-gray-50 rounded-3xl flex flex-col md:flex-row items-center gap-8 group hover:border-blue-100 transition-all bg-gray-50/30">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-blue-600 border border-gray-100 group-hover:scale-105 transition-transform">
                <FileText size={48} />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-900 mb-1">resume_olivia_reiss.pdf</h4>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> Updated 2 days ago</span>
                  <span className="flex items-center gap-1.5">Size: 1.2 MB</span>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                  <button className="px-6 py-2.5 bg-[#0052FF] text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
                    <Download size={16} /> Download
                  </button>
                  <button className="px-6 py-2.5 bg-white text-gray-600 text-sm font-bold rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2">
                    <ExternalLink size={16} /> View
                  </button>
                  <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Re-upload section */}
            <div className="mt-10 pt-10 border-t border-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Upload New Version</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center hover:border-blue-400 transition-all bg-gray-50/50 group cursor-pointer">
                <Upload className="mx-auto text-gray-400 group-hover:text-blue-500 mb-4 transition-colors" size={32} />
                <p className="font-bold text-gray-700">Drop your new resume here to update</p>
                <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Supported formats: PDF, DOCX (Max 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeManagement;
