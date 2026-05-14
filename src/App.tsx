import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import OnboardingJobSeeker from './pages/OnboardingJobSeeker';
import OnboardingRecruiter from './pages/OnboardingRecruiter';
import DashboardLayout from './components/DashboardLayout';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import FindJobs from './pages/FindJobs';
import MyApplications from './pages/MyApplications';
import SavedJobs from './pages/SavedJobs';
import JobDetail from './pages/JobDetail';
import CompanyProfile from './pages/CompanyProfile';
import JobSeekerProfile from './pages/JobSeekerProfile';
import ResumeManagement from './pages/ResumeManagement';
import RecruiterDashboard from './pages/RecruiterDashboard';
import RecruiterProfile from './pages/RecruiterProfile';
import PostJob from './pages/PostJob';
import ManageJobs from './pages/ManageJobs';
import JobApplicantsDetail from './pages/JobApplicantsDetail';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
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
            <DashboardLayout role="seeker">
              <JobSeekerDashboard />
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
            <DashboardLayout role="seeker">
              <ResumeManagement />
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
      </Routes>
    </Router>
  );
}

export default App;
