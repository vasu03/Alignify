// Mark this Component as Client-Side Components
"use client";

// Importing required modules
import React from "react";

// Importing custom api hooks
import { useLogOut } from "../api/use-logout";
import { useCurrentUser } from "../api/use-currentUser";

// Importing Icons
import { LoaderIcon, LogOutIcon } from "lucide-react";

// Importing UI components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Importing custom components
import Separator from "@/components/Separator";

// Creating User button component
const UserButton = () => {
    // Initialising a Logout mutation hook
    const { mutate: logoutMutation } = useLogOut();

    // Fetch the user data
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neutral-300">
                <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
            </div>
        );
    }

    // Return nothing if user data not available
    if (!user) return null;
    // Destructuring the user data
    const { name, email } = user;
    // transform the name and email data for better viuals
    const avatarFallbackValue = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U";

    // TSX to render the component
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition boder border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                        {avatarFallbackValue}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-4" sideOffset={10}>
                <div className="flex items-center justify-start gap-2 py-4">
                    <Avatar className="size-12 boder border-neutral-300">
                        <AvatarFallback className="text-xl bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                            {avatarFallbackValue}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-sm font-medium text-neutral-900">{name || "User"}</p>
                        <p className="text-xs font-medium text-neutral-900">{email || "user@email.com"}</p>
                    </div>
                </div>
                <Separator />
                <DropdownMenuItem onClick={() => logoutMutation()} className="flex items-center text-base px-4 py-2 text-neutral-700 hover:!text-red-500 hover:!bg-red-50 cursor-pointer">
                    <LogOutIcon />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

// Exporting the component
export default UserButton;
