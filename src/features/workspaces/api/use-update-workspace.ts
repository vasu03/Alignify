// Importing required modules
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import UI components
import { toast } from "sonner";

// Import our RPC client
import { client } from "@/lib/rpc";

// Defining the type for the request & response of the API to ensure end-to-end type-safety 
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"], 200>;     // 200 to only get the data & not the data|error thrown by route

// Creating a custom hook to handle the update Workspace mutation 
export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.workspaces[":workspaceId"]["$patch"]({ form, param });

            if (!response.ok) {
                throw new Error("Failed to update a workspace");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
            toast.success("Workspace Updated");
        },
        onError: () => {
            toast.error("Failed to update workspace");
        }
    });

    return mutation;
};