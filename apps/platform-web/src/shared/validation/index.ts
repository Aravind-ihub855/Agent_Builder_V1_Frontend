import { z } from 'zod';

/**
 * Common validation schemas reusable across features
 */

export const emailSchema = z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address');

export const passwordSchema = z
    .string()
    .min(1, 'Password is required');

export const PASSWORD_REQUIREMENTS = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
} as const;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const strongPasswordSchema = z
    .string()
    .min(PASSWORD_REQUIREMENTS.MIN_LENGTH, `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`)
    .max(PASSWORD_REQUIREMENTS.MAX_LENGTH, `Password must be less than ${PASSWORD_REQUIREMENTS.MAX_LENGTH} characters`)
    .regex(passwordRegex, 'Password must include uppercase, lowercase, number, and special character');

export const nameSchema = z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long');

/**
 * Validation helper to safely parse and return errors
 */
export function validateWithSchema<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: Record<string, string>;
} {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
        if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
        }
    });
    return { success: false, errors };
}
