import * as z from 'zod' 

export const SignInSchema = z.object({
  email: z
    .email({error: 'Please enter a valid email address.'})
    .trim(),
  password: z
    .string()
    .min(6, {error: 'Password must be at least 6 characters long.'})
    .regex(/[a-zA-Z]/, {error: 'Password must contain at least one letter.'})
    .regex(/[0-9]/, {error: 'Password must contain at least one number.'})
    .trim(),
})

export const SignUpSchema = SignInSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, {error: 'Name must be at least 2 characters long.'}),
})

export type FormState =
  | {
      error?: {
        errors: string[]
        properties?: {
          name?: { errors: string[] }
          email?: { errors: string[] }
          password?: { errors: string[] }
        }
      }
      message?: string
    }
  | undefined

