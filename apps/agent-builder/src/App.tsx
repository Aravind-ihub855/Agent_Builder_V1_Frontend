import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { AuthProvider, QueryProvider } from '@/app/providers';
import { AppRouter } from '@/app/router';
import { AppErrorBoundary } from '@/error/AppErrorBoundary';
import { ToastProvider } from '@/shared/components/ui/Toast';

function App() {
    return (
        <AppErrorBoundary>
            <Provider store={store}>
                <QueryProvider>
                    <ToastProvider>
                        <AuthProvider>
                            <AppRouter />
                        </AuthProvider>
                    </ToastProvider>
                </QueryProvider>
            </Provider>
        </AppErrorBoundary>
    );
}

export default App;
