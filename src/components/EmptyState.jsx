import React from 'react';
import Button from './Button';
import { cn } from '../utils/cn';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  onActionClick,
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl border border-gray-100 p-12 md:p-20 text-center flex flex-col items-center justify-center shadow-sm',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Icon size={32} className="text-gray-300" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {description && (
        <p className="text-gray-500 mt-2 max-w-sm mx-auto font-medium">
          {description}
        </p>
      )}
      {actionText && onActionClick && (
        <Button
          variant="primary"
          onClick={onActionClick}
          className="mt-8 px-8 py-3 font-bold"
        >
          {actionText}
        </Button>
      )}
      {children}
    </div>
  );
};

export default EmptyState;
