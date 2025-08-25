// Import required modules
import { Loader } from "lucide-react";
import React from "react";

// A loading page for the Standalone routes
const StandaloneLoading = () => {
    return (
        <div className="min-h-[700px] flex items-center justify-center">
            <Loader className="animate-spin size-8 text-muted-foreground" />
        </div>
    );
};

// Export the loading page
export default StandaloneLoading;