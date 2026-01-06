import { useAuth } from '@/app/providers';
import { User, Settings, LayoutDashboard, LogOut, Zap } from 'lucide-react';

export default function DashboardPage() {
    const { user, logout } = useAuth();

    const quickActions = [
        { icon: LayoutDashboard, label: 'Overview', color: 'from-blue-500 to-indigo-600' },
        { icon: Zap, label: 'Actions', color: 'from-emerald-500 to-teal-600' },
        { icon: Settings, label: 'Settings', color: 'from-purple-500 to-pink-600' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a1a] p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Welcome back, {user?.name || 'User'} !
                        </h1>
                        <p className="text-gray-400 mt-1">Here's what's happening today</p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
                            <p className="text-gray-400">{user?.email}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 mt-1">
                                {user?.is_verified ? '✓ Verified' : 'Unverified'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action) => (
                        <button
                            key={action.label}
                            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left hover:border-white/20 transition-all"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
                                <action.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">
                                {action.label}
                            </h4>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
