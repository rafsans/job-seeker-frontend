import React, { useState, useEffect } from 'react';
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
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPublicCompany } from '../../api/recruiter';

const formatIDR = (amount) => {
  if (!amount) return null;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const res = await getPublicCompany(id);
        if (res?.data) {
          setCompany(res.data);
        } else {
          setError('Company not found.');
        }
      } catch (err) {
        console.error('Failed to fetch company:', err);
        setError('Failed to load company profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mr-3" size={36} />
        <p className="text-gray-600 text-lg font-medium">Loading company profile...</p>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="text-center py-16 bg-white border border-gray-100 rounded-[2.5rem]">
        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
        <p className="text-gray-600 font-bold text-lg">{error || 'Company not found'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#0052FF] font-bold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  const openJobs = company.jobs || [];
  const fullLocation = [company.city, company.province, company.country].filter(Boolean).join(', ');

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
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Logo */}
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden flex-shrink-0">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="max-w-full max-h-full object-contain p-2" />
              ) : (
                <span className="text-3xl font-black text-gray-300 uppercase">
                  {company.name?.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-gray-900">{company.name}</h1>
                {company.isVerified && <ShieldCheck className="text-blue-500" size={20} />}
              </div>
              <p className="text-gray-500 font-medium">
                {company.industry} {fullLocation && `• ${fullLocation}`}
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {company.email && (
              <a
                href={`mailto:${company.email}`}
                className="flex-grow md:flex-grow-0 px-6 py-3 bg-gray-50 text-gray-900 font-bold rounded-xl border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-2 justify-center"
              >
                <Mail size={18} /> Contact
              </a>
            )}
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="flex-grow md:flex-grow-0 px-6 py-3 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 justify-center"
              >
                Visit Website <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: About + Jobs */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          {company.description && (
            <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">About the Company</h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line break-words">
                {company.description}
              </p>
            </section>
          )}

          {/* Open Jobs */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Open Opportunities</h2>
              <span className="bg-blue-50 text-[#0052FF] px-3 py-1 rounded-full text-xs font-bold">
                {openJobs.length} {openJobs.length === 1 ? 'Job' : 'Jobs'}
              </span>
            </div>
            {openJobs.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No open positions at the moment.</p>
            ) : (
              <div className="space-y-4">
                {openJobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/dashboard/jobs/${job.id}`}
                    className="flex items-center justify-between p-6 rounded-2xl border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
                  >
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#0052FF] transition-colors truncate">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mt-1 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} /> {job.employmentType?.replace('_', ' ')}
                        </span>
                        {job.category && (
                          <span className="px-2 py-0.5 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase rounded border border-blue-100">
                            {job.category.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      {job.salaryMin && (
                        <>
                          <p className="font-bold text-gray-900 text-sm">
                            {formatIDR(job.salaryMin)} - {formatIDR(job.salaryMax)}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Monthly</p>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Company Information</h3>
            <div className="space-y-6">
              {company.companySize && (
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-blue-500 flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Company Size</p>
                    <p className="font-bold text-gray-900">{company.companySize}</p>
                  </div>
                </div>
              )}
              {company.industry && (
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-blue-500 flex-shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Industry</p>
                    <p className="font-bold text-gray-900">{company.industry}</p>
                  </div>
                </div>
              )}
              {company.phone && (
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-blue-500 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="font-bold text-gray-900">{company.phone}</p>
                  </div>
                </div>
              )}
              {company.email && (
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-blue-500 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="font-bold text-gray-900 break-all">{company.email}</p>
                  </div>
                </div>
              )}
              {company.website && (
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-blue-500 flex-shrink-0">
                    <Globe size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Website</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#0052FF] hover:underline break-all"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              )}
              {fullLocation && (
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-blue-500 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="font-bold text-gray-900">{[company.address, company.city, company.country].filter(Boolean).join(', ')}</p>
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

export default CompanyProfile;
