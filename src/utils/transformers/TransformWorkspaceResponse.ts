// Import required modules
import { Models } from "node-appwrite";

// Import Custom types
import { SanitizedCreateWorkspaceType, SanitizedGetWorkspaceType, SanitizedUpdateWorkspaceType } from "@/types/SanitizedWorkspaceType";
import { WorkspaceType } from "@/features/workspaces/types";

// A transformer to sanitize the response of Create Workspace response
export const transformCreateWorkspaceResponse = (workspace: Models.Document): SanitizedCreateWorkspaceType => {
    // Cast generic workspace into a strict Workspace type
    const ws = workspace as WorkspaceType;

    // return the transformed workspace document
    return {
        id: ws.$id,
        name: ws.name,
        userId: ws.userId,
        createdAt: ws.$createdAt
    };
};

// A transformer to sanitize the response of Update Workspace response
export const transformUpdateWorkspaceResponse = (workspace: Models.Document): SanitizedUpdateWorkspaceType => {
    // Cast generic workspace into a strict workspace type
    const ws = workspace as WorkspaceType;
    
    // return the transformed workspace document
    return {
        id: ws.$id,
        name: ws.name,
        userId: ws.userId,
        createdAt: ws.$createdAt
    };
};

// A helper transformer to transform each Document in the DocumentsList
const transformWorkspaceDocument = (workspace: Models.Document): SanitizedGetWorkspaceType => {
    // Cast generic workspace into a strict Workspace type
    const ws = workspace as WorkspaceType;

    return {
        id: ws.$id,
        name: ws.name,
        imageUrl: ws.imageUrl,
        userId: ws["userId"],
        createdAt: ws.$createdAt,
    }
};

// A transformer to sanitize the response of Get Workspaces response
export const transformGetWorkspacesResponse = (list: Models.DocumentList<Models.Document>) => ({
    data: list.documents.map(transformWorkspaceDocument),
    total: list.total,
});