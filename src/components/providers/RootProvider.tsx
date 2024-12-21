// To make RootProcider and its Children to be Client sided components 
"use client";

// Importing required modules
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Creating a Root Provider for the application
const RootProvider = ({ children }: { children: ReactNode }) => {
    // Creating a Query Client
    const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000, } } }));

    // Wrap the children with Providers
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

// Exporting the RootProvider
export default RootProvider;