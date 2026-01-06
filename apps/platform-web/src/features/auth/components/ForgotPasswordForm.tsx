'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../validation';
import type { ForgotPasswordFormData } from '../types';
import { useForgotPassword } from '../hooks';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { ErrorMessage, SuccessMessage } from '@/shared/components/common';
import { ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
    onBack: () => void;
}

/**
 * ForgotPasswordForm Component (UI Only)
 * Business logic is in useForgotPassword hook
 */
export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
    const { forgotPassword, isLoading, error, success } = useForgotPassword();

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    return (
        <form onSubmit={handleSubmit(forgotPassword)} className="space-y-4">
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />

            <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                placeholder="you@example.com"
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
                Send Reset Link
            </Button>

            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 mx-auto text-sm text-gray-400 hover:text-white"
            >
                <ArrowLeft className="w-4 h-4" /> Back to login
            </button>
        </form>
    );
}
