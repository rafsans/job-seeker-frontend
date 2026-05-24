import React from 'react';
import { cn } from '../utils/cn';

const Textarea = React.forwardRef(({
  label,
  error,
  placeholder,
  rows = 3,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-gray-900 font-medium placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-100 resize-none',
          error && 'border-red-300 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
