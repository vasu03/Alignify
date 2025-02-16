// Ensure this file is only executed on the server-side to prevent client-side exposure
import "server-only";

// Import necessary Appwrite SDK modules
import { Client, Account, Storage, Users, Databases } from "node-appwrite";

// Function to create and return an admin client instance for Appwrite API SDK
export const createAdminClient = async () => {
    // Initialize a new client instance with admin-level privileges
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Set the Appwrite API endpoint
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!) // Set the Appwrite project ID
        .setKey(process.env.NEXT_APPWRITE_KEY!); // Set the admin API key for elevated privileges

    // Return an object with a getter for the Account service
    return {
        get account() {
            // Initialize and return the Account service
            return new Account(client); 
        },
    };
};