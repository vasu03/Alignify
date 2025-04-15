// Importing required modules
import React from "react";
import { redirect } from "next/navigation";

// Importing custom UI components
import UserButton from "@/features/auth/components/UserButton";

// Importing custom actions
import { getCurrent } from "@/features/auth/actions";

// Defining the page component for App page
const page = async () => {
	// Get the currently authenticated user
	const currentUser = await getCurrent();
	if (!currentUser) redirect("/sign-in");

	// TSX for rendering the page component
	return (
		<div className="">
			Dashboard
		</div>
	);
};

// Exporting the page component for App page
export default page;