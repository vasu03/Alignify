// To make this file available only on the server-sides
import "server-only";

// Importing required Appwrite SDK modules
import { Client, Account, Storage, Users, Databases } from "node-appwrite";

// Function to create a client instance for Appwrite API SDK
export const createAdminClient = async () => {
    // Creating a new client instance
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    // Returning the client instance
    return {
        get account() { return new Account(client) },
    };
};