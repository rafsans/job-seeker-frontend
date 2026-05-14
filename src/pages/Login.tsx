import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    navigate('/onboarding/seeker');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-500">Sign in if you already have an account.</p>
      </div>

      <form className="w-full space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter your email</label>
          <input
            type="email"
            placeholder="oliviareiss91@gmail.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter your password</label>
          <input
            type="password"
            placeholder="**********"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#0052FF] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200"
        >
          Continue
        </button>
      </form>

      <div className="w-full flex items-center my-8">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="px-4 text-gray-400 text-sm">or sign in with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mb-8">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-5 h-5" />
        <span className="font-medium text-gray-700">Sign In with Google</span>
      </button>

      <p className="text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#0052FF] font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
