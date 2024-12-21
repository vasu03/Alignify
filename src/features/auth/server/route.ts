// Importing required modules
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

// Importing custom validation schemas
import { SignInSchema } from "../schemas/SignIn_Schema";
import { SignUpSchema } from "../schemas/SignUp_Schema";

// Creating a new Hono instance to handle the POST request for the sign-in feature
const authRoute = new Hono()
    .post(
        "/signin",
        zValidator("json", SignInSchema),
        async (c) => {
            // Extracting the email and password from the request body
            const { email, password } = c.req.valid("json");

            return c.json({ email, password });
        }
    )
    .post(
        "/signup",
        zValidator("json", SignUpSchema),
        async (c) => {
            // Extracting the name, email & password from the request body
            const { name, email, password } = c.req.valid("json");

            return c.json({ name, email, password });
        }
    );

export default authRoute;