import React from 'react';
import { 
  Lock, 
  Mail, 
  Trash2
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import Button from '../components/Button';

const Settings = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Account Settings"
        subtitle="Manage your email and security preferences."
      />

      <div className="space-y-6">
        {/* Email Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Mail className="text-blue-500" size={20} /> Email Address
          </h3>
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="w-full">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Current Email</p>
              <Input 
                type="email" 
                defaultValue="oliviareiss91@gmail.com"
              />
            </div>
            <Button
              variant="secondary"
              className="w-full md:w-auto px-8 py-3 whitespace-nowrap"
            >
              Update Email
            </Button>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="text-blue-500" size={20} /> Change Password
          </h3>
          <div className="space-y-4 max-w-md">
            <Input
              type="password"
              label="Current Password"
              placeholder="••••••••"
            />
            <Input
              type="password"
              label="New Password"
              placeholder="••••••••"
            />
            <Button
              variant="primary"
              className="px-8 py-3"
            >
              Change Password
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
          <h3 className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
            <Trash2 size={20} /> Delete Account
          </h3>
          <p className="text-red-500/70 text-sm mb-6 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
          <Button
            variant="danger"
            className="px-8 py-3"
          >
            Delete My Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
