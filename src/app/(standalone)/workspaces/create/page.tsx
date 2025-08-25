// Import required modules
import React from "react";

// Import custom components
import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";

// Defining the page component for Create Workspace page
const CreateWorkspacePage = () => {
    return (
        <div className="w-[95%] sm:w-[80%] md:w-[768px] py-10 shadow-lg shadow-gray-200 rounded-lg">
            <CreateWorkspaceForm />
        </div>
    );
};

// Export the Page component
export default CreateWorkspacePage;