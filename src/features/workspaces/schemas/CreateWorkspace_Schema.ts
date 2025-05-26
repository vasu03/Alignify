// Importing required modules
import { z } from "zod";

// Defining the Create Workspace Schema for form validation
export const CreateWorkspaceSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    imageUrl: z.union([
        z.instanceof(File),
        z.string().transform((val) => val === "" ? undefined : val),
    ]).optional(),
});