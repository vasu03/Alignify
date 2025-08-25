// Importing required modules
import { z } from "zod";

// Defining the Update Workspace Schema for form validation
export const UpdateWorkspaceSchema = z.object({
    name: z.string().trim().min(1, "Must be 1 or more characters.").optional(),
    imageUrl: z.union([
        z.instanceof(File),
        z.string().transform((val) => val === "" ? undefined : val),
    ]).optional(),
});