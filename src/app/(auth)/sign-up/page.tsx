// Mark this page and all its children as Client-Side Components
"use client";

// Importing required modules
import React from "react";

// Importing the custom UI components
import SignUpCard from "@/features/auth/components/SignUpCard";

// Defining the page component for Sign-Up page
const page = () => {
    // TSX for rendering the page component
    return (
        <SignUpCard />
    );
};

// Exporting the page component for Sign-Up page
export default page;