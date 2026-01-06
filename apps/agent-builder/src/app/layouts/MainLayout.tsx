import { type ReactNode } from 'react';

export function MainLayout({ children }: { children: ReactNode }) {
    return <div className="min-h-screen bg-[#0a0a1a]">{children}</div>;
}
