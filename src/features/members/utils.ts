// Import requred modules
import { Query, type Databases } from "node-appwrite";

// Import custom constants
import { DATABASE_ID, MEMBERS_COLLECTION_ID } from "@/utils/constants";

// An interface to define the props for GetMember
interface GetMemberProps {
    databases: Databases;
    workspaceId: string;
    userId: string;
};

// An helper function to get a member for a workspace
export const getMember = async ({ databases, workspaceId, userId }: GetMemberProps) => {
    // get a list of all available records in members collection for current user
    const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_COLLECTION_ID,
        [
            Query.equal("workspaceId", workspaceId),
            Query.equal("userId", userId)
        ],
    );

    return members.documents[0];
};