import React from 'react';
import { cn } from '../utils/cn';

const PageHeader = ({
  title,
  subtitle,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8',
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 self-start md:self-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
