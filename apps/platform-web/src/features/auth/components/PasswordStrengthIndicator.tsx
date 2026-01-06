'use client';

import { useMemo } from 'react';
import { cn } from '@/shared/utils';

interface Props {
    password: string;
}

export function PasswordStrengthIndicator({ password }: Props) {
    const strength = useMemo(() => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[@$!%*?&]/.test(password)) score++;
        return score;
    }, [password]);

    const getColor = () => {
        if (strength <= 1) return 'bg-red-500';
        if (strength <= 2) return 'bg-orange-500';
        if (strength <= 3) return 'bg-yellow-500';
        if (strength <= 4) return 'bg-lime-500';
        return 'bg-emerald-500';
    };

    const getLabel = () => {
        if (strength <= 1) return 'Very Weak';
        if (strength <= 2) return 'Weak';
        if (strength <= 3) return 'Fair';
        if (strength <= 4) return 'Good';
        return 'Strong';
    };

    if (!password) return null;

    return (
        <div className="space-y-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={cn(
                            'h-1 flex-1 rounded-full transition-colors',
                            strength >= level ? getColor() : 'bg-white/10'
                        )}
                    />
                ))}
            </div>
            <p className="text-xs text-gray-400">
                Password strength: <span className="font-medium">{getLabel()}</span>
            </p>
        </div>
    );
}
