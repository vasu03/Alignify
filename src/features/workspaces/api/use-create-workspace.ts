// Importing required modules
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import UI components
import { toast } from "sonner";

// Import our RPC client
import { client } from "@/lib/rpc";

// Defining the type for the request & response of the API to ensure end-to-end type-safety 
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;
type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;

// Creating a custom hook to handle the create Workspace mutation 
export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await client.api.workspaces["$post"]({ form });

            if (!response.ok) {
                throw new Error("Failed to create a workspace");
            }

            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            toast.success("Workspace Created");
        },
        onError: () => {
            toast.error("Failed to create workspace");
        }
    });

    return mutation;
};