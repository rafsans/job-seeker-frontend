import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bookmark, Trash2 } from 'lucide-react';
import Button from './Button';
import { cn } from '../utils/cn';

const normalizeJobType = (t) => {
  if (!t) return '';
  return t.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

const JobCard = ({
  job,
  layout = 'grid', // 'grid' or 'list'
  isBookmarked = false,
  onBookmarkClick,
  onApplyClick,
  onDeleteClick,
  hasApplied = false,
  className = '',
  ...props
}) => {
  const {
    id,
    company,
    logo,
    position,
    location,
    salary,
    time,
    type,
    category,
    tags = [],
  } = job;

  if (layout === 'list') {
    return (
      <div
        className={cn(
          'bg-white p-6 rounded-3xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-blue-200 transition-all shadow-sm',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2 flex-shrink-0">
            <img src={logo} alt={company} className="max-w-full max-h-full object-contain" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052FF] transition-colors">
              {position}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
              <span className="font-medium text-gray-700">{company}</span>
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-gray-400" /> {location}
                </span>
              )}
              {type && (
                <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase rounded border border-gray-100">
                  {normalizeJobType(type)}
                </span>
              )}
              {category && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded border border-blue-100">
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {onApplyClick && (
            <Button
              variant={hasApplied ? "outline" : "primary"}
              size="sm"
              onClick={onApplyClick}
              disabled={hasApplied}
              className={cn("px-6 py-2.5 text-sm", hasApplied && "bg-gray-100 text-gray-500 border-gray-100 opacity-80 cursor-not-allowed")}
            >
              {hasApplied ? "Applied" : "Apply Now"}
            </Button>
          )}
          {onDeleteClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDeleteClick}
              className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 hover:border-red-100 rounded-xl"
            >
              <Trash2 size={20} />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Default: grid layout (card)
  return (
    <div
      className={cn(
        'bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group flex flex-col justify-between h-full shadow-sm',
        className
      )}
      {...props}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
            <img src={logo} alt={company} className="max-w-full max-h-full object-contain" />
          </div>
          {onBookmarkClick && (
            <button
              onClick={onBookmarkClick}
              className={cn(
                'text-gray-300 hover:text-[#0052FF] transition-colors p-1.5 hover:bg-blue-50 rounded-lg',
                isBookmarked && 'text-[#0052FF] bg-blue-50'
              )}
            >
              <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          )}
        </div>
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#0052FF] transition-colors mb-1">
          {position}
        </h3>
        <p className="text-sm font-medium text-gray-500 mb-2">{company}</p>
        {category && (
          <div className="mb-4">
            <span className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">
              {category}
            </span>
          </div>
        )}

        <div className="space-y-2 mb-6">
          {location && (
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <MapPin size={14} /> {location}
            </div>
          )}
          {salary && (
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <DollarSign size={14} /> {salary}
            </div>
          )}
          {time && (
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <Clock size={14} /> {time}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-50 text-[#0052FF] text-[10px] font-bold uppercase tracking-wider rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        {id && (
          <Link
            to={`/dashboard/jobs/${id}`}
            className="text-sm font-bold text-gray-900 hover:text-[#0052FF] transition-colors"
          >
            Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
