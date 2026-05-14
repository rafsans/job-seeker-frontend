import React from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  ChevronLeft, 
  Bookmark, 
  Share2, 
  Globe, 
  Users,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const JobDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for a single job
  const job = {
    id: id || '1',
    company: 'Google',
    logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png',
    position: 'Senior Product Designer',
    location: 'Singapore (Remote)',
    salary: '$6,000 - $8,500',
    type: 'Full-time',
    postedDate: '2 hours ago',
    experience: '5+ years',
    industry: 'Technology',
    companySize: '10,000+ Employees',
    description: `We are looking for a Senior Product Designer to join our team in Singapore. You will be responsible for creating beautiful and functional user interfaces for our global products. You'll work closely with product managers, engineers, and other designers to define the product vision and execute on it.`,
    responsibilities: [
      'Lead the design of complex features from concept to launch.',
      'Create high-fidelity mockups and interactive prototypes.',
      'Collaborate with cross-functional teams to ensure design feasibility.',
      'Conduct user research and translate findings into design improvements.',
      'Mentor junior designers and contribute to our design system.'
    ],
    requirements: [
      '5+ years of experience in product design or related field.',
      'Expertise in Figma and other design tools.',
      'Strong portfolio demonstrating UI/UX excellence.',
      'Experience working in an agile environment.',
      'Excellent communication and collaboration skills.'
    ],
    benefits: [
      'Competitive salary and equity.',
      'Health, dental, and vision insurance.',
      'Flexible working hours and remote options.',
      'Professional development budget.',
      'Modern office with free snacks and drinks.'
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
        Back to search
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex gap-6">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center p-3 border border-gray-100">
              <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{job.position}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 font-medium">
                <Link to="/dashboard/company/google-id" className="flex items-center gap-1.5 hover:text-[#0052FF] transition-colors">
                  <Building2 size={18} className="text-blue-500" /> {job.company}
                </Link>
                <span className="flex items-center gap-1.5"><MapPin size={18} className="text-blue-500" /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={18} className="text-blue-500" /> {job.postedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-grow md:flex-grow-0 p-3.5 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-2xl border border-gray-100 transition-all">
              <Bookmark size={24} />
            </button>
            <button className="flex-grow md:flex-grow-0 p-3.5 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-2xl border border-gray-100 transition-all">
              <Share2 size={24} />
            </button>
            <button className="flex-grow md:flex-grow-0 px-8 py-3.5 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
              Apply Now
            </button>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-10 border-t border-gray-50">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Salary</p>
            <p className="font-bold text-gray-900 flex items-center gap-1"><DollarSign size={16} className="text-green-500" /> {job.salary}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Job Type</p>
            <p className="font-bold text-gray-900 flex items-center gap-1"><Briefcase size={16} className="text-blue-500" /> {job.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Experience</p>
            <p className="font-bold text-gray-900 flex items-center gap-1"><Users size={16} className="text-purple-500" /> {job.experience}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Industry</p>
            <p className="font-bold text-gray-900 flex items-center gap-1"><Globe size={16} className="text-orange-500" /> {job.industry}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Job Description</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {job.description}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Responsibilities</h2>
            <ul className="space-y-4">
              {job.responsibilities.map((item, i) => (
                <li key={i} className="flex gap-4 text-gray-600">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 size={20} className="text-blue-500" />
                  </div>
                  <span className="text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Requirements</h2>
            <ul className="space-y-4">
              {job.requirements.map((item, i) => (
                <li key={i} className="flex gap-4 text-gray-600">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Company Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">About the Company</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100">
                <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{job.company}</h4>
                <p className="text-sm text-gray-500">{job.industry}</p>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Size</span>
                <span className="text-gray-900 font-bold">{job.companySize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Website</span>
                <a href="#" className="text-blue-500 font-bold hover:underline">google.com</a>
              </div>
            </div>
            <Link 
              to="/dashboard/company/google-id" 
              className="block w-full text-center py-3.5 bg-gray-50 text-gray-900 font-bold rounded-xl border border-gray-100 hover:bg-gray-100 transition-all"
            >
              View Profile
            </Link>
          </div>

          {/* Benefits */}
          <div className="bg-[#0052FF] rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6">Job Benefits</h3>
              <ul className="space-y-4">
                {job.benefits.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <div className="p-1 bg-white/20 rounded-full">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
