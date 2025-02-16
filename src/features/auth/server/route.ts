// Import required modules
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { setCookie, deleteCookie } from "hono/cookie";

// Import utility function to create an admin client for Appwrite
import { createAdminClient } from "@/lib/appwrite";

// Import custom validation schemas for sign-in and sign-up
import { SignInSchema } from "../schemas/SignIn_Schema";
import { SignUpSchema } from "../schemas/SignUp_Schema";

// Import custom constants
import { AUTH_COOKIE } from "../utils/authConstants";

// Import custom middleware for session handling
import { sessionMiddleware } from "@/lib/sessionMiddleware";

// Create a new Hono instance to define authentication routes
const authRoute = new Hono()
    .get(
        "/currentUser",
        sessionMiddleware,
        (c) => {
            // Obtain the currently authenticated user details
            const user = c.get("user");
            // Send the user details as response
            return c.json({ data: user });
        }
    )
    .post(
        "/signin",
        // Validate the request body against the SignInSchema
        zValidator("json", SignInSchema),
        async (c) => {
            // Extract email and password from the validated request body
            const { email, password } = c.req.valid("json");

            // Retrieve the account object from the admin client
            const { account } = await createAdminClient();

            // Create a new email/password session for the user
            const session = await account.createEmailPasswordSession(email, password);

            // Set an authentication cookie with the session secret
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true, // Prevent client-side access to the cookie
                secure: true, // Ensure the cookie is only sent over HTTPS
                sameSite: "strict", // Prevent cross-site request forgery (CSRF)
                maxAge: 60 * 60 * 24 * 3, // Set cookie expiration to 3 days
            });

            // Return a success response
            return c.json({ success: true });
        },
    )
    .post(
        "/signup",
        // Validate the request body against the SignUpSchema
        zValidator("json", SignUpSchema),
        async (c) => {
            // Extract name, email, and password from the validated request body
            const { name, email, password } = c.req.valid("json");

            // Retrieve the account object from the admin client
            const { account } = await createAdminClient();

            // Create a new user account with a unique ID, email, password, and name
            const user = await account.create(ID.unique(), email, password, name);

            // Create a new email/password session for the newly registered user
            const session = await account.createEmailPasswordSession(email, password);

            // Set an authentication cookie with the session secret
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 3,
            });

            // Return a success response with the user's name
            return c.json({ success: true, data: user?.name! });
        },
    )
    .post(
        "logout",
        // Use the session middleware to ensure the user is authenticated
        sessionMiddleware,
        async (c) => {
            // Retrieve the account object from the context
            const account = c.get("account");

            // Delete the authentication cookie
            deleteCookie(c, AUTH_COOKIE);

            // Delete the current session to log the user out
            await account.deleteSession("current");

            // Return a success response
            return c.json({ success: true });
        }
    );

// Export the authentication route for use in the application
export default authRoute;