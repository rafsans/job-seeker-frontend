import React, { useState, useEffect } from 'react';
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
  Building2,
  Loader2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getRecruiterProfile, updateRecruiterProfile as apiUpdateCompanyProfile } from '../../api/recruiter';

// ─── API helpers ──────────────────────────────────────────────────────────────
const fetchCompanyProfile = () =>
  getRecruiterProfile().then((r) => r.data);

const updateCompanyProfile = (payload) =>
  apiUpdateCompanyProfile(payload).then((r) => r.data);

// ─── Component ────────────────────────────────────────────────────────────────
const RecruiterProfile = () => {
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanyProfile();
        setCompany(data);
        setForm(dataToForm(data));
      } catch (err) {
        console.error('Failed to load company profile:', err);
        setError('Failed to load company profile. Please refresh.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Map API response → form fields (snake_case → camelCase)
  const dataToForm = (d) => ({
    name: d.name || '',
    description: d.description || '',
    industry: d.industry || '',
    companySize: d.companySize || '',
    website: d.website || '',
    email: d.email || '',
    phone: d.phone || '',
    address: d.address || '',
    city: d.city || '',
    province: d.province || '',
    country: d.country || '',
    logoUrl: d.logoUrl || '',
  });

  // Map form → API payload (camelCase → snake_case)
  const formToPayload = (f) => ({
    name: f.name,
    description: f.description,
    industry: f.industry,
    company_size: f.companySize,
    website: f.website || '',
    email: f.email,
    phone: f.phone,
    address: f.address,
    city: f.city,
    province: f.province,
    country: f.country,
    logo_url: f.logoUrl || '',
  });

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateCompanyProfile(formToPayload(form));
      setCompany(updated);
      setForm(dataToForm(updated));
      setIsEditing(false);
      toast.success('Company profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(dataToForm(company));
    setIsEditing(false);
  };

  // ─── Loading / Error ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading company profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const initials = company?.name
    ? company.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  // ─── Edit View ───────────────────────────────────────────────────────────────
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
              onClick={handleCancel}
              disabled={saving}
              className="flex-grow md:flex-grow-0 px-6 py-2.5 bg-white text-gray-600 font-bold rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-grow md:flex-grow-0 px-6 py-2.5 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Identity Section */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="text-blue-500" size={20} /> Identity &amp; Industry
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Size</label>
                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                >
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201-500">201-500 Employees</option>
                  <option value="500+">500+ Employees</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
            </div>
          </section>

          {/* Contact & Location */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="text-blue-500" size={20} /> Contact &amp; Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Business Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hr@company.com"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Province</label>
                <input
                  type="text"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ─── View Mode ────────────────────────────────────────────────────────────────
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
        <div className="px-10 py-10">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Logo / Initials */}
            <div className="relative">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="w-40 h-40 rounded-3xl border-8 border-white shadow-xl object-cover bg-white"
                />
              ) : (
                <div className="w-40 h-40 rounded-3xl border-8 border-white shadow-xl bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-extrabold">
                  {initials}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 p-2 bg-green-500 text-white rounded-full border-4 border-white">
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="pb-2 flex-grow">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-3xl font-extrabold text-gray-900">{company.name}</h2>
                <span className="px-3 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase rounded-lg">
                  Verified Company
                </span>
              </div>
              <p className="text-gray-500 font-medium mt-1 flex items-center gap-2 flex-wrap">
                {company.industry && <><Briefcase size={16} /> {company.industry}</>}
                {company.city && <><MapPin size={16} /> {company.city}{company.country ? `, ${company.country}` : ''}</>}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: About & Location */}
        <div className="lg:col-span-2 space-y-8">
          {company.description && (
            <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Info className="text-blue-500" size={20} /> About Company
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">{company.description}</p>
            </section>
          )}

          {(company.address || company.city) && (
            <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="text-blue-500" size={20} /> Office Location
              </h3>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                {company.address && <p className="font-bold text-gray-900 mb-1">{company.address}</p>}
                {(company.city || company.province) && (
                  <p className="text-gray-500">{[company.city, company.province].filter(Boolean).join(', ')}</p>
                )}
                {company.country && <p className="text-gray-500">{company.country}</p>}
              </div>
            </section>
          )}
        </div>

        {/* Right: Contact Details */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Details</h3>
            <div className="space-y-6">
              {company.email && (
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="font-bold text-gray-900 truncate">{company.email}</p>
                  </div>
                </div>
              )}
              {company.phone && (
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="font-bold text-gray-900">{company.phone}</p>
                  </div>
                </div>
              )}
              {company.website && (
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl flex-shrink-0">
                    <Globe size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Website</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-blue-500 flex items-center gap-1 hover:underline truncate"
                    >
                      {company.website.replace(/^https?:\/\//, '')}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}
              {company.companySize && (
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-50 text-[#0052FF] rounded-xl flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company Size</p>
                    <p className="font-bold text-gray-900">{company.companySize} Employees</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
