import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import JobCard from '../../components/JobCard';
import EmptyState from '../../components/EmptyState';
import { getSavedJobs, unsaveJob, applyJob, getMyApplications } from '../../api/jobs';
import { toast } from 'react-hot-toast';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const [savedRes, appsRes] = await Promise.all([
        getSavedJobs(),
        getMyApplications().catch(() => ({ data: [] }))
      ]);
      if (savedRes.data && Array.isArray(savedRes.data)) {
        setSavedJobs(savedRes.data);
      }
      if (appsRes.data && Array.isArray(appsRes.data)) {
        setAppliedJobIds(appsRes.data.map(app => app.jobId));
      }
    } catch (err) {
      console.error('Failed to load saved jobs:', err);
      toast.error('Failed to load your saved jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleDelete = async (savedJobId) => {
    try {
      await unsaveJob(savedJobId);
      setSavedJobs(savedJobs.filter(j => j.id !== savedJobId));
      toast.success('Job removed from saved list.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove saved job.');
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyJob({ jobId, coverLetter: '', resumeUrl: '' });
      toast.success('Successfully applied to this job!');
      // Navigate to applications tab so user sees it
      navigate('/dashboard/applications');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to apply. You might have already applied.');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="Saved Jobs"
        subtitle="Jobs you've bookmarked for later."
      />

      {loading ? (
        <div className="flex items-center justify-center p-16 bg-white rounded-3xl border border-gray-100">
          <Loader2 className="animate-spin text-[#0052FF] mr-3" size={32} />
          <p className="text-gray-500 font-bold">Loading your saved jobs...</p>
        </div>
      ) : savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {savedJobs.map((savedJob) => {
            const jobData = savedJob.job || {};
            const companyName = jobData.company?.name || jobData.companyName || 'Unknown Company';
            
            // Map backend job model to JobCard props structure
            const mappedJob = {
              id: jobData.id,
              company: companyName,
              // Create a fake logo with just the first letter since we might not have a URL
              logo: jobData.company?.logoUrl || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" font-weight="bold" fill="%239ca3af" text-anchor="middle" dy=".3em">${companyName.charAt(0)}</text></svg>`,
              position: jobData.title,
              location: jobData.location,
              salary: jobData.salaryMin
                ? `${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(jobData.salaryMin))} - ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(jobData.salaryMax))}`
                : '',
              type: jobData.employmentType,
              category: jobData.category?.name,
              tags: jobData.jobSkills?.map(js => js.skill?.name).filter(Boolean) || [],
            };

            return (
              <JobCard
                key={savedJob.id}
                job={mappedJob}
                layout="list"
                isBookmarked={true}
                hasApplied={appliedJobIds.includes(jobData.id)}
                onApplyClick={() => handleApply(jobData.id)}
                onDeleteClick={() => handleDelete(savedJob.id)} // unsaveJob takes the savedJob.id, not the job.id
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved jobs yet"
          description="When you find a job you like, bookmark it to see it here."
          actionText="Browse Jobs"
          onActionClick={() => navigate('/dashboard/find-jobs')}
        />
      )}
    </div>
  );
};

export default SavedJobs;
