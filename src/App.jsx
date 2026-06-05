import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './components/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OnboardingJobSeeker from './pages/candidate/OnboardingJobSeeker';
import OnboardingRecruiter from './pages/recruiter/OnboardingRecruiter';
import DashboardLayout from './components/DashboardLayout';
import JobSeekerDashboard from './pages/candidate/JobSeekerDashboard';
import FindJobs from './pages/candidate/FindJobs';
import MyApplications from './pages/candidate/MyApplications';
import SavedJobs from './pages/candidate/SavedJobs';
import JobDetail from './pages/candidate/JobDetail';
import CompanyProfile from './pages/candidate/CompanyProfile';
import JobSeekerProfile from './pages/candidate/JobSeekerProfile';
import ResumeManagement from './pages/candidate/ResumeManagement';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterProfile from './pages/recruiter/RecruiterProfile';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';
import JobApplicantsDetail from './pages/recruiter/JobApplicantsDetail';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import { useState } from 'react';

function App() {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />

          {/* Secured Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/onboarding/seeker"
              element={<OnboardingJobSeeker />}
            />
            <Route
              path="/onboarding/recruiter"
              element={<OnboardingRecruiter />}
            />
            <Route
              path="/dashboard"
              element={
                <DashboardLayout role="seeker" isPremium={isPremium}>
                  <JobSeekerDashboard isPremium={isPremium} setIsPremium={setIsPremium} />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/recruiter"
              element={
                <DashboardLayout role="recruiter">
                  <RecruiterDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/recruiter/profile"
              element={
                <DashboardLayout role="recruiter">
                  <RecruiterProfile />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/recruiter/post-job"
              element={
                <DashboardLayout role="recruiter">
                  <PostJob />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/recruiter/edit-job/:id"
              element={
                <DashboardLayout role="recruiter">
                  <PostJob />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/recruiter/manage-jobs"
              element={
                <DashboardLayout role="recruiter">
                  <ManageJobs />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/recruiter/jobs/:id/applicants"
              element={
                <DashboardLayout role="recruiter">
                  <JobApplicantsDetail />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <DashboardLayout>
                  <JobSeekerProfile />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/find-jobs"
              element={
                <DashboardLayout>
                  <FindJobs />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/jobs/:id"
              element={
                <DashboardLayout>
                  <JobDetail />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/company/:id"
              element={
                <DashboardLayout>
                  <CompanyProfile />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/applications"
              element={
                <DashboardLayout>
                  <MyApplications />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/saved"
              element={
                <DashboardLayout>
                  <SavedJobs />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/resume"
              element={
                <DashboardLayout role="seeker" isPremium={isPremium}>
                  <ResumeManagement isPremium={isPremium} setIsPremium={setIsPremium} />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
