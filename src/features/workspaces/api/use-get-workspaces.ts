// Import required modules
import { useQuery } from "@tanstack/react-query";

// Import custom RPC client instance
import { client } from "@/lib/rpc";

// Define a custom hook to fetch the all the workspaces
export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"], // Unique key for caching
        queryFn: async () => {
            // Fetch the workspace data from the API
            const response = await client.api.workspaces.$get();

            // If the response is not OK, return null
            if (!response.ok) {
                throw new Error("Failed to fetch workspaces");
            }

            // Parse the JSON data from the response
            const { data } = await response.json();
            return data;
        },
    });
    // Return the query object for use in components
    return query;
};