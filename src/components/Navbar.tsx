// Importing required modules
import React from "react";

// Importing custom components
import MobileSidebar from "./MobileSidebar";
import UserButton from "@/features/auth/components/UserButton";

// Creating a Navbar for the Dashboard Page
const Navbar = () => {

    // TSX to render the page
    return (
        <nav className="p-3 w-full flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-xl font-semibold text-neutral-800">Home</h1>
                <p className="text-sm font-normal tracking-wider text-muted-foreground">Manage all your projects and tasks here</p>
            </div>

            {/* Sidebar for Mobile Screens */}
            <MobileSidebar />

            <UserButton />
        </nav>
    );
};

// Exporting the component;
export default Navbar;