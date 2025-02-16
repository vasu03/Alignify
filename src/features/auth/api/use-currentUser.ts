// Import required modules
import { useQuery } from "@tanstack/react-query";

// Import custom RPC client instance
import { client } from "@/lib/rpc";

// Define a custom hook to fetch the current user
export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"], // Unique key for caching
        queryFn: async () => {
            // Fetch the current user data from the API
            const response = await client.api.auth.currentUser.$get();

            // If the response is not OK, return null
            if (!response.ok) {
                return null;
            }

            // Parse the JSON data from the response
            const { data } = await response.json();
            return data;
        },
    });
    // Return the query object for use in components
    return query;
};