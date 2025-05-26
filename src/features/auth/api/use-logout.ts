// Importing required modules
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import UI components
import { toast } from "sonner";

// Import our RPC client
import { client } from "@/lib/rpc";

// Defining the type for the response of the API to ensure end-to-end type-safety 
type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

// Creating a custom hook to handle the Logout mutation
export const useLogOut = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]();

            if (!response.ok) {
                throw new Error("Failed to log out");
            }

            return await response.json();
        },
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            toast.success("Successfully logged out");
        },
        onError: () => {
            toast.error("Failed to log out");
        }
    });

    return mutation;
};