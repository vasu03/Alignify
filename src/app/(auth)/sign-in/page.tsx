// Importing required modules
import React from "react";
import { redirect } from "next/navigation";

// Importing the custom UI components
import SignInCard from "@/features/auth/components/SignInCard";

// Importing custom actions
import { getCurrent } from "@/features/auth/actions";

// Defining the page component for Sign-In page
const page = async () => {
    // Get the currently authenticated user
        const currentUser = await getCurrent();
        if (currentUser) redirect("/");

    // TSX for rendering the page component
    return (
        <SignInCard />
    );
};

// Exporting the page component for Sign-In page
export default page;