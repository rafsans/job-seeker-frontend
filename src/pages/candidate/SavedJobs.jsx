import React from 'react';
import { Bookmark } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import JobCard from '../../components/JobCard';
import EmptyState from '../../components/EmptyState';

const SavedJobs = () => {
  const savedJobs = [
    { company: 'Google', logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png', position: 'Senior Product Designer', location: 'Singapore', type: 'Full-time' },
    { company: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', position: 'Backend Developer', location: 'Remote', type: 'Full-time' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Saved Jobs"
        subtitle="Jobs you've bookmarked for later."
      />

      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {savedJobs.map((job, i) => (
            <JobCard
              key={i}
              job={job}
              layout="list"
              onApplyClick={() => console.log('Applying...')}
              onDeleteClick={() => console.log('Deleting...')}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved jobs yet"
          description="When you find a job you like, bookmark it to see it here."
          actionText="Browse Jobs"
          onActionClick={() => console.log('Navigating to jobs...')}
        />
      )}
    </div>
  );
};

export default SavedJobs;

