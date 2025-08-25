// Import required modules
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

// Import custom schemas for Workspace
import { CreateWorkspaceSchema } from "../schemas/CreateWorkspace_Schema";
import { UpdateWorkspaceSchema } from "../schemas/UpdateWorkspace_Schema";

// Import custom constants
import { DATABASE_ID, WORKSPACES_COLLECTION_ID, MEMBERS_COLLECTION_ID, BUCKET_ID, WORKSPACE_INVITE_CODE_LENGTH } from "@/utils/constants";

// Import custom types
import { MemberRole } from "@/features/members/types";

// Import custom utilities & helper functions
import { generateInviteCode } from "@/utils/generator";
import { getMember } from "@/features/members/utils";

// Import custom middlewares for session handling
import { sessionMiddleware } from "@/lib/sessionMiddleware";

// Import custom response sanitization transformers
import { transformCreateWorkspaceResponse, transformGetWorkspacesResponse, transformUpdateWorkspaceResponse } from "@/utils/transformers/TransformWorkspaceResponse";
import { WorkspaceType } from "../types";

// Create a Hono App instance to define Workspace routes
const workspacesRoute = new Hono()
    .get(
        "/",
        sessionMiddleware,
        async (c) => {
            // get the current user
            const user = c.get("user");

            // get the object to databases
            const databases = c.get("databases");

            // get a list of all available records in members collection for current user
            const members = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_COLLECTION_ID,
                [Query.equal("userId", user.$id)]
            );

            if (members.total === 0) {
                return c.json({ data: { data: [], total: 0 } });
            }

            // get list of all Workspaces having current user as it's member
            const workspaceIDs = members.documents.map((member) => member.workspaceId);

            // get a list of all Workspaces available corresponding to current user
            const workspacesList = await databases.listDocuments(
                DATABASE_ID,
                WORKSPACES_COLLECTION_ID,
                [
                    Query.orderDesc("$createdAt"),
                    Query.contains("$id", workspaceIDs)
                ]
            );

            // return the data as response
            return c.json({ data: transformGetWorkspacesResponse(workspacesList) });
        }
    )
    .post(
        "/",
        sessionMiddleware,
        // Validate the request body against the CreateWorkspaceSchema
        zValidator("form", CreateWorkspaceSchema),
        async (c) => {
            // Get the User & Database instance using middleware
            const user = c.get("user");
            const storage = c.get("storage");
            const databases = c.get("databases");

            // Get the validated request body
            const { name, imageUrl } = c.req.valid("form");

            // handle image uploading
            let uploadedImageUrl: string | undefined;   // b64 url
            if (imageUrl instanceof File) {
                const file = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    imageUrl
                );

                // setting up image preview (actually View) without any transformations
                const arrayBuffer = await storage.getFileView(
                    BUCKET_ID,
                    file.$id
                );

                // prepare a base64 url for image to be uploaded
                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            }

            // Generate a invite code for workspace
            const workspaceInviteCode = generateInviteCode(WORKSPACE_INVITE_CODE_LENGTH);

            // Create a new document in the "workspaces" collection
            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_COLLECTION_ID,
                ID.unique(),
                {
                    name: name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl,
                    inviteCode: workspaceInviteCode,
                }
            ) as WorkspaceType;

            // Create a new member when creating a new workspace
            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_COLLECTION_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId: workspace.$id,
                    role: MemberRole.ADMIN
                }
            );

            // return the data as response
            return c.json({ data: transformCreateWorkspaceResponse(workspace) });
        }
    )
    .patch(
        "/:workspaceId",
        sessionMiddleware,
        // Validate the request body against the UpdateWorkspaceSchema
        zValidator("form", UpdateWorkspaceSchema),
        async (c) => {
            // Get the User & Database instance using middleware
            const user = c.get("user");
            const storage = c.get("storage");
            const databases = c.get("databases");

            // Get the workspace id from URL params
            const { workspaceId } = c.req.param();
            // Get the validated request body
            const { name, imageUrl } = c.req.valid("form");

            // using helper func, check if the person trying to update the workspace,
            // is a member & have privellege to update it
            const member = await getMember({ databases, workspaceId, userId: user.$id });
            if (!member || member.role !== MemberRole.ADMIN) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            // handle image uploading
            let uploadedImageUrl: string | undefined;   // b64 url
            if (imageUrl instanceof File) {
                const file = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    imageUrl
                );

                // setting up image preview (actually View) without any transformations
                const arrayBuffer = await storage.getFileView(
                    BUCKET_ID,
                    file.$id
                );

                // prepare a base64 url for image to be uploaded
                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            } else {
                // if the user dont changes the image then preserve the old one
                uploadedImageUrl = imageUrl;
            }

            // Update the existing document in Workspace collection
            const workspace = await databases.updateDocument(
                DATABASE_ID,
                WORKSPACES_COLLECTION_ID,
                workspaceId,
                {
                    name,
                    imageUrl: uploadedImageUrl
                }
            );
            
            // return the data as response
            return c.json({ data: transformUpdateWorkspaceResponse(workspace) });
        }
    )

// Export the workspace route for use in the application
export default workspacesRoute; 