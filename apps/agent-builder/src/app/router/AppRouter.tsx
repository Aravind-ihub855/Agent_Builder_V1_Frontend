import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

const DashboardPage = React.lazy(() => import('@/features/dashboard/pages/DashboardPage'));

export function AppRouter() {
    return (
        <BrowserRouter>
            <React.Suspense
                fallback={
                    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                }
            >
                <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </React.Suspense>
        </BrowserRouter>
    );
}
