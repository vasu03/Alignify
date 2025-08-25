// Import required modules
import React, { JSX } from "react";
import { redirect } from "next/navigation";

// Import custom components
import UpdateWorkspaceForm from "@/features/workspaces/components/UpdateWorkspaceForm";

// Import custom server actions
import { getWorkspace } from "@/features/workspaces/server";

// An interface to define the props for the page
interface UpdateWorkspaceSettingsPageProps {
    params: { workspaceId: string, };
}

// Defining the page component for Update Workspace page
const UpdateWorkspaceSettingsPage = async ({ params }: UpdateWorkspaceSettingsPageProps) => {
    // @note: use `await` to avoid NextJS v15+ routing warning: params should be awaited before accessing its properties
    const { workspaceId } = await params;

    // get initial data for workspace updation
    const initialValues = await getWorkspace({ workspaceId: workspaceId });
    if (!initialValues) redirect(`/workspaces/${workspaceId}`);

    // TSX to render the page
    return (
        <div className="w-[95%] sm:w-[80%] md:w-[768px] py-10 shadow-lg shadow-gray-200 rounded-lg">
            <UpdateWorkspaceForm initialValues={initialValues} />
        </div>
    );
};

// Export the Page component
export default UpdateWorkspaceSettingsPage;