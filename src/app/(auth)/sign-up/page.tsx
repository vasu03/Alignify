// Importing required modules
import React from "react";
import { redirect } from "next/navigation";

// Importing the custom UI components
import SignUpCard from "@/features/auth/components/SignUpCard";

// Importing custom actions
import { getCurrent } from "@/features/auth/actions";

// Defining the page component for Sign-Up page
const page = async () => {
    // Get the currently authenticated user
        const currentUser = await getCurrent();
        if (currentUser) redirect("/");

    // TSX for rendering the page component
    return (
        <SignUpCard />
    );
};

// Exporting the page component for Sign-Up page
export default page;