import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User } from 'lucide-react';

const Register: React.FC = () => {
  const [role, setRole] = useState<'seeker' | 'recruiter'>('seeker');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'seeker') {
      navigate('/onboarding/seeker');
    } else {
      navigate('/onboarding/recruiter');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500">Join kerjaNow and start your journey today.</p>
      </div>

      <form className="w-full space-y-4" onSubmit={handleRegister}>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-gray-700">Choose your role</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('seeker')}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                role === 'seeker'
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
              }`}
            >
              <User size={18} />
              <span className="font-medium">Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                role === 'recruiter'
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
              }`}
            >
              <Briefcase size={18} />
              <span className="font-medium">Recruiter</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#0052FF] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200 mt-4"
        >
          Create Account
        </button>
      </form>

      <div className="w-full flex items-center my-6">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="px-4 text-gray-300 text-xs uppercase tracking-wider">or join with</span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mb-6">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-5 h-5" />
        <span className="font-medium text-gray-700">Sign up with Google</span>
      </button>

      <p className="text-gray-500">
        Already have an account?{' '}
        <Link to="/" className="text-[#0052FF] font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
