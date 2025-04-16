// Importing required modules
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Importing react icons
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";
// Importing Lucide icons
import { SettingsIcon, User2Icon } from "lucide-react";

// An constant object containing the navigation links
const navLinks = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: "Members",
        href: "/members",
        icon: User2Icon,
        activeIcon: User2Icon,
    },
];

// Creating a Navigation menu for Dashboard Sidebar
const SidebarNavigation = () => {
    // TSX to render the component
    return (
        <div className="flex flex-col">
            {navLinks.map((link, idx) => {
                const isActive = false;
                const Icon = isActive ? link.activeIcon : link.icon;
                return (
                    <Link href={link.href} key={idx} className="">
                        <div className={cn(
                            "flex items-center gap-2 p-2 text-base font-medium text-neutral-500 hover:text-blue-500 transition-all duration-300",
                            isActive && "bg-white shadow-xs hover:opacity-100 text-blue-500"
                        )}>
                            <Icon className="size-5" />
                            {link.label}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

// Exporting the Sidebar Naviagtion component
export default SidebarNavigation;