// Importing required modules
import React from "react";
import Link from "next/link";

// Importing custom components
import Logo from "./Logo";
import Separator from "./Separator";
import SidebarNavigation from "./SidebarNavigation";
import SwitchWorkspace from "./SwitchWorkspace";

// Creating a Sidebar for Dashboard page
const Sidebar = () => {
    // TSX to render the component
    return (
        <aside className="h-full border  bg-neutral-100 p-4 w-full">
            <Link href={"/"}>
                <Logo />
            </Link>
            <Separator />
            <SwitchWorkspace />
            <Separator />
            <SidebarNavigation />
        </aside>
    );
};

// Exporting the component
export default Sidebar;