import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  Bookmark, 
  MessageSquare, 
  Settings, 
  Bell, 
  LogOut,
  Menu,
  Sparkles,
  FileText
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, role = 'seeker', isPremium = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Read user info from localStorage (saved at login)
  const [navUser, setNavUser] = useState({ name: '', role: '', email: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const u = JSON.parse(raw);
        const details = u.userDetails;
        const fullName = details?.firstName
          ? `${details.firstName} ${details.lastName || ''}`.trim()
          : u.email || '';
        setNavUser({ name: fullName, role: u.role, email: u.email || '' });
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }, []);

  const initials = navUser.name
    ? navUser.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : navUser.email?.[0]?.toUpperCase() || '?';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const seekerItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Resume', path: '/dashboard/resume' },
    { icon: Search, label: 'Find Jobs', path: '/dashboard/find-jobs' },
    { icon: Briefcase, label: 'My Applications', path: '/dashboard/applications' },
    { icon: Bookmark, label: 'Saved Jobs', path: '/dashboard/saved' },
  ];

  const recruiterItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/recruiter' },
    { icon: Briefcase, label: 'Post a Job', path: '/dashboard/recruiter/post-job' },
    { icon: Search, label: 'Manage Jobs', path: '/dashboard/recruiter/manage-jobs' },
  ];

  const menuItems = role === 'seeker' ? seekerItems : recruiterItems;

  return (
    <div className="flex h-screen bg-[#F8FAFF]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-72 flex-shrink-0 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-[#0052FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">kerjaNow</span>
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                               (item.path === '/dashboard/find-jobs' && location.pathname.startsWith('/dashboard/jobs/'));
              
              return (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                  ${isActive
                    ? 'bg-[#0052FF] text-white shadow-lg shadow-blue-200' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            )})}
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-auto space-y-2 pt-6 border-t border-gray-100">
            {/* Plan Display */}
            <div className="px-4 py-4 mb-2 bg-blue-50/50 rounded-2xl border border-blue-100/50">
               <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Plan</span>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm border ${isPremium ? 'text-amber-600 bg-amber-50 border-amber-100' : 'text-[#0052FF] bg-white border-blue-50'}`}>
                    {isPremium ? 'Premium' : 'Starter'}
                  </span>
               </div>
               <p className="text-xs font-bold text-gray-700">Level up your career</p>
            </div>

            <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 transition-colors">
              <Settings size={20} />
              Settings
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-600 transition-colors w-full"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <button 
            className="lg:hidden p-2 text-gray-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>



          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Link 
              to={role === 'seeker' ? "/dashboard/profile" : "/dashboard/recruiter/profile"} 
              className="flex items-center gap-3 ml-2 border-l pl-6 border-gray-100 group transition-all"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-[#0052FF]">
                  {navUser.name || navUser.email || (role === 'seeker' ? 'Job Seeker' : 'Recruiter')}
                </p>
                <p className="text-xs text-gray-500">
                  {role === 'seeker' ? 'Candidate' : 'Recruiter'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold text-sm ring-2 ring-blue-50 group-hover:ring-[#0052FF]/30 transition-all flex-shrink-0">
                {initials}
              </div>
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-grow overflow-y-auto overflow-x-hidden p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
