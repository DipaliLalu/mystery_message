import { z } from "zod"

export const signUpSchema = z.object({
    username: z.string().min(2, { message: 'Username at least 2 chaeacters' }).min(20, { message: 'Username must be more than 20 characters' }).regex(/^[a-zA-Z0-9_]+$/, { message: 'Username must not contain special characters' }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: 'Password must be 6 characters' })
})
