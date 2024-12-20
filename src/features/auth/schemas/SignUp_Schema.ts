import { z } from "zod";

// Defining the SignUp Schema for form validation
export const SignUpSchema = z.object({
    name: z.string().trim().min(2, "Name must contain at least 2 character(s)").max(50).refine((value) => /^[a-zA-Z\s]*$/.test(value), {message: "Name must contain only alphabets"}),
    email: z.string().trim().email(),
    password: z.string().min(8, "Password must contain at least 8 character(s)").max(256, "Password must not exceed 256 character(s)").refine(
        (value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#*-])[A-Za-z\d@#*-]{8,}$/.test(value), {
        message: "Password must contain atleast 1 uppercase, 1 lowercase, 1 numeric, and 1 special character from *@#-",
    }),
    confirmPassword: z.string().min(8, "").max(256),
}).refine(data => data.password === data.confirmPassword, {
    message: "Both Passwords do not match",
    path: ["confirmPassword"],
});

// Defining the type for the SignUp Schema for form validation
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
