import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, User } from "lucide-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { registerUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import { getOnboardingData, getRecruiterOnboarding } from "../../api/onboarding";

const Register = () => {
  const [role, setRole] = useState("CANDIDATE");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    let userRole = null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userRole = payload.role;
    } catch (e) {
      console.error('Invalid token format:', e);
      return;
    }

    if (!userRole) return;

    // Check if user object is cached in localStorage to redirect immediately and avoid flicker
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.role === userRole) {
          if (userRole === 'RECRUITER') {
            if (user.isOnboarded) {
              navigate('/dashboard/recruiter', { replace: true });
            } else {
              navigate('/onboarding/recruiter', { replace: true });
            }
          } else {
            if (user.isOnboarded) {
              navigate('/dashboard', { replace: true });
            } else {
              navigate('/onboarding/seeker', { replace: true });
            }
          }
          return;
        }
      } catch (e) {
        console.error('Failed to parse cached user:', e);
      }
    }

    const verifyStatus = async () => {
      try {
        if (userRole === 'RECRUITER') {
          try {
            const companyRes = await getRecruiterOnboarding();
            const onboarded = !!(companyRes && companyRes.data);
            localStorage.setItem('user', JSON.stringify({ role: userRole, isOnboarded: onboarded }));
            if (onboarded) {
              navigate('/dashboard/recruiter', { replace: true });
            } else {
              navigate('/onboarding/recruiter', { replace: true });
            }
          } catch (companyError) {
            localStorage.setItem('user', JSON.stringify({ role: userRole, isOnboarded: false }));
            navigate('/onboarding/recruiter', { replace: true });
          }
        } else {
          try {
            const onboardingRes = await getOnboardingData();
            const details = onboardingRes.data?.userDetails;
            const onboarded = !!details;
            localStorage.setItem('user', JSON.stringify({ role: userRole, isOnboarded: onboarded }));
            if (onboarded) {
              navigate('/dashboard', { replace: true });
            } else {
              navigate('/onboarding/seeker', { replace: true });
            }
          } catch (onboardingError) {
            localStorage.setItem('user', JSON.stringify({ role: userRole, isOnboarded: false }));
            navigate('/onboarding/seeker', { replace: true });
          }
        }
      } catch (err) {
        console.error('Failed to verify session status:', err);
      }
    };

    verifyStatus();
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: "Password and Confirm Password do not match." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: role,
      };

      const response = await registerUser(payload);
      
      // Jika request sukses, tampilkan toast dan redirect ke halaman login
      toast.success(response.message || "Registration successful!");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const data = err.response?.data;
      
      if (data?.errors && Array.isArray(data.errors)) {
        const errorsMap = {};
        data.errors.forEach(errItem => {
          if (errItem.path) {
            errorsMap[errItem.path] = errItem.msg || errItem.message;
          }
        });
        setFieldErrors(errorsMap);
      }
      
      setError(
        data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-gray-500">
          Join kerjaNow and start your journey today.
        </p>
      </div>

      <form className="w-full space-y-4" onSubmit={handleRegister}>
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-gray-700">
            Choose your role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("CANDIDATE")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                role === "CANDIDATE"
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
              }`}
            >
              <User size={18} />
              <span className="font-medium">Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("RECRUITER")}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                role === "RECRUITER"
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
              }`}
            >
              <Briefcase size={18} />
              <span className="font-medium">Recruiter</span>
            </button>
          </div>
        </div>

        <Input
          type="email"
          name="email"
          label="Email address"
          placeholder="example@mail.com"
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
          required
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Password Confirmation"
          placeholder="********"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={fieldErrors.confirmPassword}
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4"
          loading={loading}
        >
          Create Account
        </Button>
      </form>
      <p className="text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-[#0052FF] font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
