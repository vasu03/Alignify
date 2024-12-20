// To make the Sign-In page and all its children components to be Client-sided only
"use client";

// Importing required modules
import React from "react";

// Importing the custom UI components
import SignInCard from "@/features/auth/components/SignInCard";

// Defining the page component for Sign-In page
const page = () => {
    // TSX for rendering the page component
    return (
        <SignInCard />
    );
};

// Exporting the page component for Sign-In page
export default page;