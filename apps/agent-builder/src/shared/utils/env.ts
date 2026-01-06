/**
 * Environment Configuration
 * All values MUST come from environment variables - no fallbacks
 */

const validateEnv = (key: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`[ENV] Missing required environment variable: ${key}. Please configure in .env file.`);
    }
    return value;
};

const apiUrl = import.meta.env.VITE_API_URL;
const authAppUrl = import.meta.env.NEXT_APP_URL;

// Only validate in browser (not during build)
if (typeof window !== 'undefined') {
    validateEnv('VITE_API_URL', apiUrl);
    validateEnv('NEXT_APP_URL', authAppUrl);
}

export const env = {
    apiUrl: apiUrl ?? '',
    authAppUrl: authAppUrl ?? '',
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    mode: import.meta.env.MODE,
} as const;
