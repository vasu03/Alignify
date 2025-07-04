// Import required modules
import { redirect } from "next/navigation";

// Import custom components
// import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";

// Import custom actions
import { getWorkspaces } from "@/features/workspaces/server";

// Defining the page component for App page
const page = async () => {

	// Get the workspaces and render the first workspace in document list 
	const workspaces = await getWorkspaces();
	if (workspaces?.total === 0) redirect("/workspaces/create");
	else redirect(`/workspaces/${workspaces?.documents[0].$id}`);
};

// Exporting the page component for App page
export default page;