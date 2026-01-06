/**
 * Environment Configuration
 * All values MUST come from environment variables - no fallbacks
 */

const validateEnv = (key: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`[ENV] Missing required environment variable: ${key}. Please configure in .env.local file.`);
    }
    return value;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const reactAppUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;

// Only validate in browser (not during build/SSR)
if (typeof window !== 'undefined') {
    validateEnv('NEXT_PUBLIC_API_URL', apiUrl);
    validateEnv('NEXT_PUBLIC_REACT_APP_URL', reactAppUrl);
}

export const env = {
    apiUrl: apiUrl ?? '',
    reactAppUrl: reactAppUrl ?? '',
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
} as const;
