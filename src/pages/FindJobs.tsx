import React from 'react';
import { Search, MapPin, Filter, Bookmark, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const FindJobs: React.FC = () => {
  const jobs = [
    { id: '1', company: 'Google', logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png', position: 'Senior Product Designer', location: 'Singapore (Remote)', salary: '$6,000 - $8,500', type: 'Full-time', time: '2 hours ago', tags: ['Design', 'Product'] },
    { company: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg', position: 'Visual UI Designer', location: 'Stockholm, SE', salary: '$5,500 - $7,000', type: 'Full-time', time: '5 hours ago', tags: ['Visual', 'UI'] },
    { company: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg', position: 'Frontend Engineer', location: 'San Francisco, US', salary: '$120k - $150k', type: 'Contract', time: '1 day ago', tags: ['React', 'TS'] },
    { company: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', position: 'Product Manager', location: 'Menlo Park, CA', salary: '$140k - $180k', type: 'Full-time', time: '2 days ago', tags: ['Management', 'Strategy'] },
    { company: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', position: 'Backend Developer', location: 'Remote', salary: '$90k - $120k', type: 'Full-time', time: '3 days ago', tags: ['Node.js', 'Go'] },
    { company: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', position: 'UI Engineer', location: 'Los Gatos, CA', salary: '$130k - $160k', type: 'Full-time', time: '4 days ago', tags: ['React', 'Animation'] },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Jobs</h1>
        <p className="text-gray-500 mt-1">Explore thousands of job opportunities.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          <Search size={20} className="text-gray-400" />
          <input type="text" placeholder="Job title or keyword" className="bg-transparent border-none focus:ring-0 w-full ml-2 outline-none" />
        </div>
        <div className="flex-grow flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          <MapPin size={20} className="text-gray-400" />
          <input type="text" placeholder="Location" className="bg-transparent border-none focus:ring-0 w-full ml-2 outline-none" />
        </div>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
          <Filter size={20} /> Filter
        </button>
        <button className="bg-[#0052FF] text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
                <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
              </div>
              <button className="text-gray-300 hover:text-[#0052FF] transition-colors">
                <Bookmark size={20} />
              </button>
            </div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052FF] transition-colors mb-1">{job.position}</h3>
            <p className="text-sm font-medium text-gray-500 mb-4">{job.company}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <MapPin size={14} /> {job.location}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <DollarSign size={14} /> {job.salary}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                <Clock size={14} /> {job.time}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={`/dashboard/jobs/${job.id}`} className="text-sm font-bold text-gray-900 hover:text-[#0052FF] transition-colors">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindJobs;
