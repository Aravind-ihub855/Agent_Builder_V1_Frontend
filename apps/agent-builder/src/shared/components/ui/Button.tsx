import React from 'react';
import { cn } from '@/shared/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    isLoading?: boolean;
}

const variants = {
    default: 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/25',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-white/20 bg-transparent hover:bg-white/10 text-white',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    ghost: 'hover:bg-white/10 text-white',
};

const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', isLoading, disabled, children, ...props }, ref) => (
        <button
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                'disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {children}
        </button>
    )
);
Button.displayName = 'Button';
