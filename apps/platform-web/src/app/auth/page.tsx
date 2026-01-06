'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm, RegisterForm, ForgotPasswordForm } from '@/features/auth/components';
import { useAuth } from '@/app/providers/AuthProvider';
import { getDashboardUrl } from '@/features/auth/constants';

type AuthView = 'login' | 'register' | 'forgotPassword';

export default function AuthPage() {
    const [view, setView] = useState<AuthView>('login');
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            window.location.href = getDashboardUrl();
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0a0a1a] p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {view === 'login' && 'Welcome Back'}
                        {view === 'register' && 'Create Account'}
                        {view === 'forgotPassword' && 'Reset Password'}
                    </h1>
                    <p className="text-gray-400">
                        {view === 'login' && 'Sign in to your account'}
                        {view === 'register' && 'Get started with your account'}
                        {view === 'forgotPassword' && "We'll send you a reset link"}
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    {view === 'login' && (
                        <LoginForm
                            onForgotPassword={() => setView('forgotPassword')}
                            onRegister={() => setView('register')}
                        />
                    )}
                    {view === 'register' && (
                        <RegisterForm onLogin={() => setView('login')} />
                    )}
                    {view === 'forgotPassword' && (
                        <ForgotPasswordForm onBack={() => setView('login')} />
                    )}
                </div>
            </div>
        </main>
    );
}
