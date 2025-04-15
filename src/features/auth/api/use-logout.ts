// Importing required modules
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
            return await response.json();
        },
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
        }
    });

    return mutation;
};