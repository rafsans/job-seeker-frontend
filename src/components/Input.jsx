import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef(({
  label,
  error,
  type = 'text',
  placeholder,
  className = '',
  containerClassName = '',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <LeftIcon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={cn(
            'w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-gray-900 font-medium placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-100',
            LeftIcon && 'pl-11',
            (RightIcon || isPassword) && 'pr-11',
            error && 'border-red-300 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : (
          RightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
              <RightIcon size={18} />
            </div>
          )
        )}
      </div>
      {error && (
        <span className="text-xs text-red-500 font-medium">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
