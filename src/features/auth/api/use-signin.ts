// Importing required modules
import { useRouter } from "next/navigation"; 
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import our RPC client
import { client } from "@/lib/rpc";

// Defining the type for the request & response of the API to ensure end-to-end type-safety 
type RequestType = InferRequestType<typeof client.api.auth.signin["$post"]>;
type ResponseType = InferResponseType<typeof client.api.auth.signin["$post"]>;

// Creating a custom hook to handle the sign-in mutation
export const useSignIn = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth.signin["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
        }
    });

    return mutation;
};