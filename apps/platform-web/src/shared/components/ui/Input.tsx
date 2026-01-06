import React from 'react';
import { cn } from '@/shared/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => (
        <div className="space-y-1.5">
            {label && <label className="block text-sm font-medium text-gray-300">{label}</label>}
            <input
                ref={ref}
                className={cn(
                    'flex h-10 w-full rounded-lg border bg-white/5 px-3 py-2 text-sm text-white',
                    'placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                    error ? 'border-red-500/50' : 'border-white/10',
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    )
);
Input.displayName = 'Input';
