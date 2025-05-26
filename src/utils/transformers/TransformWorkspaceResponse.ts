// Import required modules
import { Models } from "node-appwrite";
// Import Custom types
import { SanitizedCreateWorkspaceType, SanitizedGetWorkspaceType } from "@/types/SanitizedWorkspaceType";

// A transformer to sanitize the response of Create Workspace response
export const transformCreateWorkspaceResponse = (workspace: Models.Document): SanitizedCreateWorkspaceType => {
    return {
        id: workspace.$id,
        name: workspace["name"],
        userId: workspace["userId"],
        createdAt: workspace.$createdAt
    };
};

// A helper transformer to transform each Document in the DocumentsList
const transformWorkspaceDocument = (workspace: Models.Document): SanitizedGetWorkspaceType => {
    return {
        id: workspace.$id,
        name: workspace["name"],
        imageUrl: workspace["imageUrl"],
        userId: workspace["userId"],
        createdAt: workspace.$createdAt,
    }
};

// A transformer to sanitize the response of Get Workspaces response
export const transformGetWorkspacesResponse = (list: Models.DocumentList<Models.Document>) => ({
    data: list.documents.map(transformWorkspaceDocument),
    total: list.total,
});