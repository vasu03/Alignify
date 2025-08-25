// Importing required modules
import { cookies } from "next/headers";

// Import required Appwrite SDK modules
import { Account, Client, Databases, Query } from "node-appwrite";

// Import custom constants
import { AUTH_COOKIE, DATABASE_ID, MEMBERS_COLLECTION_ID, WORKSPACES_COLLECTION_ID } from "@/utils/constants";

// Import custom utility functions
import { getMember } from "@/features/members/utils";

// Import custom types
import { WorkspaceType } from "./types";

// An action to retrieve the workspaces
export const getWorkspaces = async () => {
    try {
        // Initialize a client with user-level privileges (not admin-level)
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        // grab the cookie
        // In Next 15 we use await cookies()
        const session = (await cookies()).get(AUTH_COOKIE);

        if (!session) return { documents: [], total: 0 };

        // Attach the session to the client for authenticated requests
        client.setSession(session.value);

        // Initialize Appwrite services for Account and database operations
        const account = new Account(client);
        const databases = new Databases(client);
        const user = await account.get();

        // get a list of all available records in members collection for current user
        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_COLLECTION_ID,
            [Query.equal("userId", user.$id)]
        );

        if (members.total === 0) return { documents: [], total: 0 };

        // get list of all Workspaces having current user as it's member
        const workspaceIDs = members.documents.map((member) => member.workspaceId);

        // get a list of all Workspaces available corresponding to current user
        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACES_COLLECTION_ID,
            [
                Query.orderDesc("$createdAt"),
                Query.contains("$id", workspaceIDs)
            ]
        );

        // return the list of all workspaces
        return workspaces;
    } catch {
        return { documents: [], total: 0 };
    }
};

// An interface to define the props for getWorkspace action
interface GetWorkspaceProps {
    workspaceId: string;
};

// An action to retrieve a single workspace
export const  getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
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

        // Initialize Appwrite services for Account and database operations
        const account = new Account(client);
        const databases = new Databases(client);
        const user = await account.get();

        // check if the user is allowed to access the workspace
        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId
        });

        // if not allowed to access then throw null
        if (!member) return null;

        // get a single Workspace available corresponding to current user
        const workspace = await databases.getDocument<WorkspaceType>(
            DATABASE_ID,
            WORKSPACES_COLLECTION_ID,
            workspaceId
        );

        // return individual workspace
        return workspace;
    } catch {
        return null;
    }
};