import React, { useState } from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Info,
  Users,
  ShieldCheck,
  Edit3,
  ExternalLink,
  Briefcase,
  Save,
  X,
  Camera,
  Building2
} from 'lucide-react';

const RecruiterProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data state based on Companies schema
  const [company, setCompany] = useState({
    name: 'kerjaNow Tech',
    description: 'We are a fast-growing startup focused on building the next generation of career platforms. Our mission is to connect talent with opportunities seamlessly.',
    industry: 'Technology',
    website: 'https://kerjanow.com',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    email: 'hiring@kerjanow.com',
    phone: '+62 21 555 0123',
    address: 'Jl. Kemang Raya No. 10',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    country: 'Indonesia',
    companySize: '11-50 Employees',
    isVerified: true
  });

  const handleSave = () => {
    // Save logic would go here in production
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Company Profile</h1>
            <p className="text-gray-500 mt-1">Update your organization's public information.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-grow md:flex-grow-0 px-6 py-2.5 bg-white text-gray-600 font-bold rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex-grow md:flex-grow-0 px-6 py-2.5 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Identity Section */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="text-blue-500" size={20} /> Identity & Industry
            </h3>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
              <div className="relative group">
                <img src={company.logoUrl} alt="Logo" className="w-24 h-24 rounded-3xl object-cover border-4 border-gray-50 shadow-md" />
                <button className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </button>
              </div>
              <div className="flex-grow w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                <input 
                  type="text" 
                  value={company.name}
                  onChange={(e) => setCompany({...company, name: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Industry</label>
                <input 
                  type="text" 
                  value={company.industry}
                  onChange={(e) => setCompany({...company, industry: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Size</label>
                <select 
                  value={company.companySize}
                  onChange={(e) => setCompany({...company, companySize: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                >
                  <option value="1-10 Employees">1-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="200+ Employees">200+ Employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                rows={4}
                value={company.description}
                onChange={(e) => setCompany({...company, description: e.target.value})}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              ></textarea>
            </div>
          </section>

          {/* Contact & Location */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="text-blue-500" size={20} /> Contact & Location
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Business Email</label>
                <input 
                  type="email" 
                  value={company.email}
                  onChange={(e) => setCompany({...company, email: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  value={company.phone}
                  onChange={(e) => setCompany({...company, phone: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                <input 
                  type="url" 
                  value={company.website}
                  onChange={(e) => setCompany({...company, website: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Address</label>
                <input 
                  type="text" 
                  value={company.address}
                  onChange={(e) => setCompany({...company, address: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <input 
                  type="text" 
                  value={company.city}
                  onChange={(e) => setCompany({...company, city: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Province</label>
                <input 
                  type="text" 
                  value={company.province}
                  onChange={(e) => setCompany({...company, province: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                <input 
                  type="text" 
                  value={company.country}
                  onChange={(e) => setCompany({...company, country: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
        >
          <Edit3 size={18} /> Edit Profile
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-blue-700 to-blue-500"></div>
        <div className="px-10 pb-10">
          <div className="flex flex-col md:flex-row gap-8 items-end -mt-16">
            <div className="relative">
              <img 
                src={company.logoUrl} 
                alt={company.name} 
                className="w-40 h-40 rounded-3xl border-8 border-white shadow-xl object-cover bg-white"
              />
              <div className="absolute -bottom-2 -right-2 p-2 bg-green-500 text-white rounded-full border-4 border-white">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div className="pb-2 flex-grow">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-extrabold text-gray-900">{company.name}</h2>
                <span className="px-3 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase rounded-lg">Verified Company</span>
              </div>
              <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                <Briefcase size={16} /> {company.industry} • <MapPin size={16} /> {company.city}, {company.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="text-blue-500" size={20} /> About Company
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {company.description}
            </p>
          </section>

          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="text-blue-500" size={20} /> Office Location
            </h3>
            <div className="space-y-4">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-900 mb-1">{company.address}</p>
                <p className="text-gray-500">{company.city}, {company.province}</p>
                <p className="text-gray-500">{company.country}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Contact & Quick Stats */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Details</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="font-bold text-gray-900">{company.email}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                  <p className="font-bold text-gray-900">{company.phone}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl">
                  <Globe size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Website</p>
                  <a href={company.website} target="_blank" rel="noreferrer" className="font-bold text-blue-500 flex items-center gap-1 hover:underline truncate">
                    {company.website.replace('https://', '')} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company Size</p>
                  <p className="font-bold text-gray-900">{company.companySize}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
