import React from 'react';
import { cn } from '../utils/cn';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const presetStyles = {
  pending: {
    bg: 'bg-orange-50',
    color: 'text-orange-500',
    icon: Clock,
  },
  interview: {
    bg: 'bg-blue-50',
    color: 'text-blue-500',
    icon: AlertCircle,
  },
  accepted: {
    bg: 'bg-green-50',
    color: 'text-green-500',
    icon: CheckCircle2,
  },
  rejected: {
    bg: 'bg-red-50',
    color: 'text-red-500',
    icon: XCircle,
  },
  default: {
    bg: 'bg-gray-50',
    color: 'text-gray-500',
    icon: null,
  },
};

const Badge = ({
  children,
  variant,
  icon: CustomIcon,
  className = '',
  ...props
}) => {
  // Try to find status preset (case-insensitive)
  const normalizedVariant = typeof variant === 'string' ? variant.toLowerCase() : '';
  const preset = presetStyles[normalizedVariant] || presetStyles.default;
  const Icon = CustomIcon !== undefined ? CustomIcon : preset.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all',
        preset.bg,
        preset.color,
        className
      )}
      {...props}
    >
      {Icon && <Icon size={14} />}
      {children || variant}
    </span>
  );
};

export default Badge;
