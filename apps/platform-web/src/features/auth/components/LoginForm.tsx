'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation';
import type { LoginFormData } from '../types';
import { useLogin } from '../hooks';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { ErrorMessage } from '@/shared/components/common';
import { getDashboardUrl } from '../constants';

interface LoginFormProps {
    onForgotPassword: () => void;
    onRegister: () => void;
}

/**
 * LoginForm Component (UI Only)
 * Business logic is in useLogin hook
 */
export function LoginForm({ onForgotPassword, onRegister }: LoginFormProps) {
    const { refreshUser } = useAuth();
    const { login, isLoading, error } = useLogin(async () => {
        await refreshUser();
        window.location.href = getDashboardUrl();
    });

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    return (
        <form onSubmit={handleSubmit(login)} className="space-y-4">
            <ErrorMessage message={error} />
            <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                placeholder="you@example.com"
            />
            <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                placeholder="••••••••"
            />
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                    Forgot password?
                </button>
            </div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign In
            </Button>
            <p className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <button
                    type="button"
                    onClick={onRegister}
                    className="text-indigo-400 hover:text-indigo-300"
                >
                    Sign up
                </button>
            </p>
        </form>
    );
}
