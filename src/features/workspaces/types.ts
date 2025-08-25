// Import required modules
import { Models } from "node-appwrite";

export type WorkspaceType = Models.Document & {
    name: string,
    imageUrl: string | undefined,
    inviteCode: string,
    userId: string,
}