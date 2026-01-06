/**
 * ErrorMessage Component
 * Displays error messages in a styled container
 */
interface ErrorMessageProps {
    message: string;
    className?: string;
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
    if (!message) return null;

    return (
        <div
            role="alert"
            className={`p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 ${className}`}
        >
            {message}
        </div>
    );
}
