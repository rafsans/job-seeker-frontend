import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import { ChevronDown, Check } from 'lucide-react';

const Select = React.forwardRef(({
  label,
  error,
  options = [],
  className = '',
  containerClassName = '',
  placeholder = 'Select option',
  value,
  onChange,
  name,
  disabled,
  required,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Support both controlled and uncontrolled usage
  const [internalValue, setInternalValue] = useState('');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Find currently selected option
  const selectedOption = options.find(opt => String(opt.value) === String(currentValue));

  // Toggle open state
  const handleToggle = (e) => {
    e.preventDefault();
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  // Select an option
  const handleSelect = (optionValue) => {
    setIsOpen(false);
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    if (onChange) {
      // Simulate HTML select change event
      onChange({
        target: {
          name,
          value: optionValue,
        }
      });
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Support pressing escape to close
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div 
      ref={containerRef} 
      className={cn('w-full flex flex-col gap-1.5 relative', containerClassName)}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Hidden native select for backward compatibility & ref support */}
      <select
        ref={ref}
        name={name}
        value={currentValue ?? ''}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom dropdown trigger button */}
      <div className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            'w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl transition-all outline-none text-left font-medium flex items-center justify-between cursor-pointer',
            'hover:bg-gray-100/50 focus:ring-2 focus:ring-blue-500 focus:bg-white',
            isOpen && 'ring-2 ring-blue-500 bg-white border-blue-500/20',
            disabled && 'opacity-50 bg-gray-100 cursor-not-allowed',
            error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
            selectedOption ? 'text-gray-900' : 'text-gray-400',
            className
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              'text-gray-400 transition-transform duration-200 shrink-0 ml-2',
              isOpen && 'transform rotate-180 text-blue-500'
            )}
          />
        </button>

        {/* Custom options list popover */}
        {isOpen && (
          <div 
            className="absolute left-0 right-0 mt-2 z-50 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="p-1.5 space-y-0.5">
              {placeholder && (
                <button
                  type="button"
                  onClick={() => handleSelect('')}
                  className={cn(
                    'w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors duration-150 flex items-center justify-between font-medium cursor-pointer',
                    !currentValue ? 'bg-blue-50/50 text-[#0052FF]' : 'text-gray-400 hover:bg-gray-50'
                  )}
                >
                  <span>{placeholder}</span>
                  {!currentValue && <Check size={16} className="text-[#0052FF]" />}
                </button>
              )}
              {options.map((opt) => {
                const isSelected = String(opt.value) === String(currentValue);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      'w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors duration-150 flex items-center justify-between font-medium cursor-pointer',
                      isSelected 
                        ? 'bg-blue-50/80 text-[#0052FF] font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check size={16} className="text-[#0052FF]" />}
                  </button>
                );
              })}
            </div>
          </div>
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

Select.displayName = 'Select';

export default Select;
