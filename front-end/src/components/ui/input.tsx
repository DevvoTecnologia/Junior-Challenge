import * as React from 'react';

import { cn } from '@/lib/utils';
import { CrossCircledIcon } from '@radix-ui/react-icons';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, id, name, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          placeholder=" "
          id={name}
          name={id ?? name}
          className={cn(
            'outline-none bg-[#1c111f] rounded-lg border border-[#231826] px-3 h-[52px] text-gray-300 w-full pt-4 peer placeholder-shown:pt-0',
            error && 'border-red-900',
            className,
          )}
          ref={ref}
          {...props}
        />

        <label
          htmlFor={id ?? name}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
