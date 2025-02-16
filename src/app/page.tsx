// Mark this page and all its children as Client-Side Components
"use client";

// Importing required modules
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";

// Importing custom API routes
import { useCurrentUser } from "@/features/auth/api/use-currentUser";
import { useLogOut } from "@/features/auth/api/use-logout";
import { Button } from "@/components/ui/button";

// Defining the page component for App page
const page = () => {
	const router = useRouter();
	const { data, isLoading } = useCurrentUser();
	const { mutate } = useLogOut();

	useEffect(() => {
		if (!data && !isLoading) {
			router.push("/sign-in");
		}
	}, [data])

	// TSX for rendering the page component
	return (
		<div className="">
			{data?.name}<br />
			{data?.email}<br />
			<Button onClick={() => mutate()}>Logout</Button>
		</div>
	);
};

// Exporting the page component for App page
export default page;