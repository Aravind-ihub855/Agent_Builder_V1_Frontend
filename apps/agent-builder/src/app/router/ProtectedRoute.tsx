import { type ReactNode } from 'react';
import { useAuth } from '@/app/providers';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading, redirectToLogin } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        redirectToLogin();
        return null;
    }

    return <>{children}</>;
}
