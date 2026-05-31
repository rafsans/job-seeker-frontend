import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api/axiosInstance';
import { getCurrentUser, changeEmail as apiChangeEmail, changePassword as apiChangePassword } from '../api/auth';
import PageHeader from '../components/PageHeader';

// Password Input with show/hide toggle
const PasswordInput = ({ label, value, onChange, placeholder = '••••••••' }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-bold text-gray-700">{label}</label>}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium pr-12"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  // Current user
  const [currentEmail, setCurrentEmail] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);

  // Email change state
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [updatingEmail, setUpdatingEmail] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Fetch current user email on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        const email = res?.data?.email || res?.email || '';
        setCurrentEmail(email);
        setNewEmail(email);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        // Fallback: read from localStorage
        try {
          const stored = localStorage.getItem('user');
          if (stored) {
            const user = JSON.parse(stored);
            setCurrentEmail(user.email || '');
            setNewEmail(user.email || '');
          }
        } catch {}
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // Handle change email
  const handleChangeEmail = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return toast.error('New email is required.');
    if (!emailPassword.trim()) return toast.error('Current password is required to change email.');
    if (newEmail === currentEmail) return toast.error('New email is the same as current email.');

    setUpdatingEmail(true);
    try {
      await apiChangeEmail({
        new_email: newEmail,
        current_password: emailPassword,
      });
      toast.success('Email updated successfully!');
      setCurrentEmail(newEmail);
      setEmailPassword('');

      // Update localStorage cache
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          const user = JSON.parse(stored);
          user.email = newEmail;
          localStorage.setItem('user', JSON.stringify(user));
        }
      } catch {}
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update email.';
      toast.error(msg);
    } finally {
      setUpdatingEmail(false);
    }
  };

  // Handle change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword.trim()) return toast.error('Current password is required.');
    if (!newPassword.trim()) return toast.error('New password is required.');
    if (newPassword.length < 8) return toast.error('New password must be at least 8 characters.');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match.');

    setUpdatingPassword(true);
    try {
      await apiChangePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to change password.';
      toast.error(msg);
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Account Settings"
        subtitle="Manage your email address and security preferences."
      />

      <div className="space-y-6">

        {/* ─── Email Section ─────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Mail className="text-blue-500" size={20} /> Email Address
          </h3>
          {loadingUser ? (
            <div className="flex items-center gap-3 py-4 text-gray-400">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm font-medium">Loading account info...</span>
            </div>
          ) : (
            <form onSubmit={handleChangeEmail} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-700">Current Email</label>
                <div className="px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-medium text-sm">
                  {currentEmail || 'No email found'}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-gray-700">New Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                />
              </div>
              <PasswordInput
                label="Current Password (to verify)"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                placeholder="Enter your current password"
              />
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={updatingEmail}
                  className="px-8 py-3.5 bg-[#0052FF] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updatingEmail ? (
                    <><Loader2 className="animate-spin" size={18} /> Updating...</>
                  ) : (
                    <><Mail size={18} /> Update Email</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ─── Password Section ──────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="text-blue-500" size={20} /> Change Password
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
            />
            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Password strength hint */}
            {newPassword.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-bold">
                <ShieldCheck size={14} className={newPassword.length >= 8 ? 'text-green-500' : 'text-gray-300'} />
                <span className={newPassword.length >= 8 ? 'text-green-600' : 'text-gray-400'}>
                  {newPassword.length >= 8 ? 'Password meets minimum length' : `${8 - newPassword.length} more characters needed`}
                </span>
              </div>
            )}
            {confirmPassword.length > 0 && newPassword !== confirmPassword && (
              <div className="flex items-center gap-2 text-xs font-bold text-red-500">
                <AlertTriangle size={14} />
                <span>Passwords do not match</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={updatingPassword}
                className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updatingPassword ? (
                  <><Loader2 className="animate-spin" size={18} /> Saving...</>
                ) : (
                  <><Lock size={18} /> Change Password</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ─── Danger Zone ───────────────────────────────── */}
        <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
          <h3 className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
            <Trash2 size={20} /> Delete Account
          </h3>
          <p className="text-red-500/70 text-sm mb-6 font-medium leading-relaxed">
            Once you delete your account, all your data will be permanently removed. 
            This action cannot be undone. Please be absolutely certain before proceeding.
          </p>
          <button
            type="button"
            onClick={() => toast.error('Account deletion is disabled in this environment.')}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all flex items-center gap-2 shadow-md shadow-red-100"
          >
            <Trash2 size={18} /> Delete My Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
