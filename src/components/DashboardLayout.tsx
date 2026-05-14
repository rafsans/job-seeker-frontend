import React, { useState } from 'react';
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
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'seeker' | 'recruiter';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role = 'seeker' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const seekerItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Resume Management', path: '/dashboard/resume' },
    { icon: Search, label: 'Find Jobs', path: '/dashboard/find-jobs' },
    { icon: Briefcase, label: 'My Applications', path: '/dashboard/applications' },
    { icon: Bookmark, label: 'Saved Jobs', path: '/dashboard/saved' },
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
  ];

  const recruiterItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/recruiter' },
    { icon: Briefcase, label: 'Post a Job', path: '/dashboard/recruiter/post-job' },
    { icon: Search, label: 'Manage Jobs', path: '/dashboard/recruiter/manage-jobs' },
    { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
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
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
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
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                  ${location.pathname === item.path 
                    ? 'bg-[#0052FF] text-white shadow-lg shadow-blue-200' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-auto space-y-2 pt-6 border-t border-gray-100">
            {/* Plan Display */}
            <div className="px-4 py-4 mb-2 bg-blue-50/50 rounded-2xl border border-blue-100/50">
               <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Plan</span>
                  <span className="text-[10px] font-extrabold text-[#0052FF] uppercase bg-white px-2 py-0.5 rounded-md shadow-sm border border-blue-50">Starter</span>
               </div>
               <p className="text-xs font-bold text-gray-700">Level up your career</p>
            </div>

            <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 transition-colors">
              <Settings size={20} />
              Settings
            </Link>
            <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-600 transition-colors w-full">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <button 
            className="lg:hidden p-2 text-gray-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-96">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for jobs, companies..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
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
                  {role === 'seeker' ? "Olivia Reiss" : "kerjaNow Tech"}
                </p>
                <p className="text-xs text-gray-500">
                  {role === 'seeker' ? "UI Designer" : "Administrator"}
                </p>
              </div>
              <img 
                src={role === 'seeker' 
                  ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  : "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop"
                } 
                alt="Profile" 
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-50 group-hover:ring-[#0052FF]/30 transition-all"
              />
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-grow overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
