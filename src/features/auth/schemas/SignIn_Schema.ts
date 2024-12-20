// Importing requred modules
import {z} from "zod";

// Defining the Sign In Schema for form validation
export const SignInSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1, "Password can't be empty").max(256)
});

// Defining the type for the Sign In Schema for form validation
export type SignInSchemaType = z.infer<typeof SignInSchema>;