'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validation';
import type { RegisterFormData } from '../types';
import { useRegister } from '../hooks';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { ErrorMessage, SuccessMessage } from '@/shared/components/common';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface RegisterFormProps {
    onLogin: () => void;
}

/**
 * RegisterForm Component (UI Only)
 * Business logic is in useRegister hook
 */
export function RegisterForm({ onLogin }: RegisterFormProps) {
    const { register: registerUser, isLoading, error, success } = useRegister();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const password = watch('password', '');

    return (
        <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />

            <Input
                label="Name"
                {...register('name')}
                error={errors.name?.message}
                placeholder="John Doe"
            />
            <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                placeholder="you@example.com"
            />
            <div className="space-y-2">
                <Input
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                    placeholder="••••••••"
                />
                <PasswordStrengthIndicator password={password} />
            </div>
            <Input
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                placeholder="••••••••"
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
                Create Account
            </Button>

            <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onLogin}
                    className="text-indigo-400 hover:text-indigo-300"
                >
                    Sign in
                </button>
            </p>
        </form>
    );
}
