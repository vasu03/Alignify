// Importing required modules
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";

// Importing required utilities modules
import { createAdminClient } from "@/lib/appwrite";

// Importing custom validation schemas
import { SignInSchema } from "../schemas/SignIn_Schema";
import { SignUpSchema } from "../schemas/SignUp_Schema";

// Importing custom Constants for the APIs
import { AUTH_COOKIE } from "../utils/authConstants";
import { hash } from "node:crypto";

// Creating a new Hono instance to handle the POST request for the sign-in feature
const authRoute = new Hono()
    .post(
        "/signin",
        zValidator("json", SignInSchema),
        async (c) => {
            // Extracting the email and password from the request body
            const { email, password } = c.req.valid("json");

            // get the account object from the client instance
            const { account } = await createAdminClient();

            // Creating a new Session for the User logging in
            const session = await account.createEmailPasswordSession(email, password);

            // Create a cookie for the user logged in
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 3,
            });

            return c.json({ success: true });
        },
    )
    .post(
        "/signup",
        zValidator("json", SignUpSchema),
        async (c) => {
            // Extracting the name, email & password from the request body
            const { name, email, password } = c.req.valid("json");

            // get the account object from the client instance
            const { account } = await createAdminClient();

            // Creating a new user account using the create method from the account object
            const user = await account.create(ID.unique(), email, password, name);

            // Creating a new Session for the User created
            const session = await account.createEmailPasswordSession(email, password);

            // Create a cookie for the user created
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 3,
            });

            return c.json({ success: true, data: user?.name! });
        },
    );

export default authRoute;