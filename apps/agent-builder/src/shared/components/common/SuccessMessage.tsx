/**
 * SuccessMessage Component
 * Displays success messages in a styled container
 */
interface SuccessMessageProps {
    message: string;
    className?: string;
}

export function SuccessMessage({ message, className = '' }: SuccessMessageProps) {
    if (!message) return null;

    return (
        <div
            role="status"
            className={`p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-400 ${className}`}
        >
            {message}
        </div>
    );
}
