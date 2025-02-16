// Mark this component and its children as Client-Side Components
"use client";

// Import required modules
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Define the RootProvider component to wrap the application with necessary providers
const RootProvider = ({ children }: { children: ReactNode }) => {
    // Initialize a QueryClient instance with default options
    const [queryClient] = useState(
        () =>
            new QueryClient({ 
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }),
    );

    // Wrap the children with the QueryClientProvider to enable React Query functionality
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

// Export the RootProvider component as the default export
export default RootProvider;