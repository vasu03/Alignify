// Ensure this file is only executed on the server-side to prevent client-side exposure
import "server-only";

// Import required modules
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Import custom constants
import { AUTH_COOKIE } from "../features/auth/utils/authConstants";

// Import required Appwrite SDK modules
import {
    Client,
    Models,
    Account,
    Storage,
    Databases,
    type Users as UsersType,
    type Account as AccountType,
    type Storage as StorageType,
    type Databases as DatabasesType,
} from "node-appwrite";

// Define a type for the additional context to be used in the middleware
type AdditionalContext = {
    Variables: {
        users: UsersType,
        account: AccountType,
        storage: StorageType,
        databases: DatabasesType,
        user: Models.User<Models.Preferences>
    },
};

// Create and export a middleware for handling user sessions
export const sessionMiddleware = createMiddleware<AdditionalContext>(
    async (c, next) => {
        // Initialize a client with user-level privileges (not admin-level)
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        // Retrieve the authentication session cookie from the request
        const session = getCookie(c, AUTH_COOKIE);

        // If no session cookie is found, return an unauthorized error response
        if (!session) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        // Attach the session to the client for authenticated requests
        client.setSession(session);

        // Initialize Appwrite services for account, database, and storage operations
        const account = new Account(client);
        const storage = new Storage(client);
        const databases = new Databases(client);

        // Fetch the current user's account details using the authenticated session
        const user = await account.get();

        // Attach the initialized services and user data to the context for downstream use
        c.set("user", user);
        c.set("account", account);
        c.set("storage", storage);
        c.set("databases", databases);

        // Proceed to the next middleware or route handler
        await next();
    },
);