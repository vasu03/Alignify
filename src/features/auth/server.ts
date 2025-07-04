// Importing required modules
import { cookies } from "next/headers";

// Import custom constants
import { AUTH_COOKIE } from "@/utils/constants";

// Import required Appwrite SDK modules
import { Account, Client } from "node-appwrite";

// An action to retrieve the current user and protect our routes 
export const getCurrent = async () => {
    try {
        // Initialize a client with user-level privileges (not admin-level)
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        // grab the cookie
        // In Next 15 we use await cookies()
        const session = (await cookies()).get(AUTH_COOKIE);

        if (!session) return null;

        // Attach the session to the client for authenticated requests
        client.setSession(session.value); 

        // Initialize Appwrite services for account, database, and storage operations
        const account = new Account(client);

        return await account.get();
    } catch {
        return null;
    }
};