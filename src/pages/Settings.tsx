import React from 'react';
import { 
  Lock, 
  Mail, 
  Trash2
} from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your email and security preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Email Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Mail className="text-blue-500" size={20} /> Email Address
          </h3>
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="w-full">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Current Email</p>
              <input 
                type="email" 
                defaultValue="oliviareiss91@gmail.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all whitespace-nowrap">
              Update Email
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="text-blue-500" size={20} /> Change Password
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
            </div>
            <button className="px-8 py-3 bg-[#0052FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
              Change Password
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
          <h3 className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
            <Trash2 size={20} /> Delete Account
          </h3>
          <p className="text-red-500/70 text-sm mb-6 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
