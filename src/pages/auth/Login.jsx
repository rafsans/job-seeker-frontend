import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import {
  getOnboardingData,
  getRecruiterOnboarding,
} from "../../api/onboarding";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let role = null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch (e) {
      console.error("Invalid token format:", e);
      return;
    }

    if (!role) return;

    // Check if user object is cached in localStorage to redirect immediately and avoid flicker
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.role === role) {
          if (role === "RECRUITER") {
            if (user.isOnboarded) {
              navigate("/dashboard/recruiter", { replace: true });
            } else {
              navigate("/onboarding/recruiter", { replace: true });
            }
          } else {
            if (user.isOnboarded) {
              navigate("/dashboard", { replace: true });
            } else {
              navigate("/onboarding/seeker", { replace: true });
            }
          }
          return;
        }
      } catch (e) {
        console.error("Failed to parse cached user:", e);
      }
    }

    const verifyStatus = async () => {
      try {
        if (role === "RECRUITER") {
          try {
            const companyRes = await getRecruiterOnboarding();
            const onboarded = !!(companyRes && companyRes.data);
            localStorage.setItem(
              "user",
              JSON.stringify({ role, isOnboarded: onboarded }),
            );
            if (onboarded) {
              navigate("/dashboard/recruiter", { replace: true });
            } else {
              navigate("/onboarding/recruiter", { replace: true });
            }
          } catch (companyError) {
            localStorage.setItem(
              "user",
              JSON.stringify({ role, isOnboarded: false }),
            );
            navigate("/onboarding/recruiter", { replace: true });
          }
        } else {
          try {
            const onboardingRes = await getOnboardingData();
            const details = onboardingRes.data?.userDetails;
            const onboarded = !!details;
            localStorage.setItem(
              "user",
              JSON.stringify({ role, isOnboarded: onboarded }),
            );
            if (onboarded) {
              navigate("/dashboard", { replace: true });
            } else {
              navigate("/onboarding/seeker", { replace: true });
            }
          } catch (onboardingError) {
            localStorage.setItem(
              "user",
              JSON.stringify({ role, isOnboarded: false }),
            );
            navigate("/onboarding/seeker", { replace: true });
          }
        }
      } catch (err) {
        console.error("Failed to verify session status:", err);
      }
    };

    verifyStatus();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ email, password });

      toast.success(response.message || "Login successful!");

      const user = response.data?.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      const role = user?.role;
      const isOnboarded = user?.isOnboarded;

      setTimeout(() => {
        if (role === "RECRUITER") {
          if (isOnboarded) {
            navigate("/dashboard/recruiter");
          } else {
            navigate("/onboarding/recruiter");
          }
        } else {
          if (isOnboarded) {
            navigate("/dashboard");
          } else {
            navigate("/onboarding/seeker");
          }
        }
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-500">Sign in if you already have an account.</p>
      </div>

      <form className="w-full space-y-5" onSubmit={handleLogin}>
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <Input
          type="email"
          label="Enter your email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Enter your password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
        >
          Continue
        </Button>
      </form>
      <p className="text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[#0052FF] font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
