import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/shared/validation';

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
