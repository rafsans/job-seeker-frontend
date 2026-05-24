import React from 'react';
import { 
  MapPin, 
  Globe, 
  Users, 
  Briefcase, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck,
  ChevronLeft,
  ExternalLink
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const company = {
    id: id || 'google-id',
    name: 'Google',
    description: `Google's mission is to organize the world's information and make it universally accessible and useful. Our team in Singapore focuses on building helpful products for everyone, everywhere. We believe that diversity of perspective, idea, and background is what drives innovation.`,
    industry: 'Technology / Software',
    website: 'https://google.com',
    logoUrl: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png',
    email: 'careers@google.com',
    phone: '+65 6521 8000',
    address: '70 Pasir Panjang Rd, #03-71 Mapletree Business City',
    city: 'Singapore',
    province: 'Singapore',
    country: 'Singapore',
    companySize: '10,000+ Employees',
    isVerified: true,
    openJobs: [
      { id: 1, title: 'Senior Product Designer', location: 'Singapore', type: 'Full-time', salary: '$6,000 - $8,500' },
      { id: 2, title: 'Cloud Solutions Architect', location: 'Singapore', type: 'Full-time', salary: '$8,000 - $12,000' },
      { id: 3, title: 'Software Engineer (L4)', location: 'Remote', type: 'Full-time', salary: '$7,000 - $10,000' },
    ]
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-bold group"
      >
        <div className="p-2 bg-white rounded-xl border border-gray-100 group-hover:border-blue-200 shadow-sm">
          <ChevronLeft size={20} />
        </div>
        Back
      </button>

      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image Placeholder */}
        <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-[2.5rem]"></div>
        
        <div className="px-8 -mt-12">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center p-4 border-4 border-white shadow-xl -mt-16">
                <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-extrabold text-gray-900">{company.name}</h1>
                  {company.isVerified && <ShieldCheck className="text-blue-500" size={24} />}
                </div>
                <p className="text-gray-500 font-medium flex items-center gap-2">
                  {company.industry} • {company.city}, {company.country}
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-grow md:flex-grow-0 px-6 py-3 bg-gray-50 text-gray-900 font-bold rounded-xl border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-2 justify-center">
                <Mail size={18} /> Contact
              </button>
              <a href={company.website} target="_blank" rel="noreferrer" className="flex-grow md:flex-grow-0 px-6 py-3 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 justify-center">
                Visit Website <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: About & Jobs */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">About the Company</h2>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
              {company.description}
            </p>
          </section>

          {/* Open Jobs */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Open Opportunities</h2>
              <span className="bg-blue-50 text-[#0052FF] px-3 py-1 rounded-full text-xs font-bold">
                {company.openJobs.length} Jobs
              </span>
            </div>
            <div className="space-y-4">
              {company.openJobs.map((job) => (
                <Link 
                  key={job.id} 
                  to={`/dashboard/jobs/${job.id}`}
                  className="flex items-center justify-between p-6 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1 font-medium">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{job.salary}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Monthly</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Details Card */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Company Information</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-blue-500">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company Size</p>
                  <p className="font-bold text-gray-900">{company.companySize}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-blue-500">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Industry</p>
                  <p className="font-bold text-gray-900">{company.industry}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-blue-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                  <p className="font-bold text-gray-900">{company.phone}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-blue-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="font-bold text-gray-900">{company.email}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-blue-500">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                  <p className="font-bold text-gray-900">{company.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
