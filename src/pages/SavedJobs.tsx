import React from 'react';
import { Bookmark, MapPin, Trash2 } from 'lucide-react';

const SavedJobs: React.FC = () => {
  const savedJobs = [
    { company: 'Google', logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png', position: 'Senior Product Designer', location: 'Singapore', type: 'Full-time' },
    { company: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', position: 'Backend Developer', location: 'Remote', type: 'Full-time' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="text-gray-500 mt-1">Jobs you've bookmarked for later.</p>
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {savedJobs.map((job, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
                  <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052FF] transition-colors">{job.position}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="font-medium">{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase rounded">{job.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 bg-[#0052FF] text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all">
                  Apply Now
                </button>
                <button className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark size={32} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No saved jobs yet</h3>
          <p className="text-gray-500 mt-2">When you find a job you like, bookmark it to see it here.</p>
          <button className="mt-8 px-8 py-3 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all">
            Browse Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
