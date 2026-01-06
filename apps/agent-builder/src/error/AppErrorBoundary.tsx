import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('[ErrorBoundary]', error, errorInfo);
    }

    resetErrorBoundary = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
        if (this.state.hasError && this.state.error) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] p-6">
                    <div className="max-w-md w-full bg-white/5 border border-red-500/20 rounded-2xl p-8 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
                        <p className="text-gray-400 mb-6">An unexpected error occurred.</p>
                        {import.meta.env.DEV && (
                            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-lg text-left overflow-auto max-h-40">
                                <p className="text-xs text-red-400 font-mono">{this.state.error.message}</p>
                            </div>
                        )}
                        <div className="flex gap-3">
                            <button onClick={this.resetErrorBoundary} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
                                <RefreshCw className="w-4 h-4" /> Try Again
                            </button>
                            <button onClick={() => window.location.href = '/'} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl">
                                <Home className="w-4 h-4" /> Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
