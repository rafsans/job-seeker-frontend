import React from 'react';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 outline-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary: 'bg-[#0052FF] text-white hover:bg-blue-600 shadow-lg shadow-blue-200/50',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border border-gray-200 text-gray-700 bg-white hover:bg-gray-50',
    ghost: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3.5 text-base gap-2.5',
    lg: 'px-8 py-4.5 text-lg gap-3',
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 20} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 20} />}
        </>
      )}
    </button>
  );
};

export default Button;
