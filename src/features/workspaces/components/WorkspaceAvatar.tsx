// Import required modules
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import UI components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define props for the component
interface WorkspaceAvatarProps {
    image?: string,
    name: string,
    className?: string 
};

// Creating a Workspace Avatar component
const WorkspaceAvatar = ({image, name, className}: WorkspaceAvatarProps) => {
    if (image) {
        return (
            <div className={cn("size-7 relative rounded-sm overflow-hidden", className)}>
                <Image src={image} alt="avatar" fill className="object-cover" />
            </div>
        );
    };

    return (
        <Avatar className={cn("size-7 relative rounded-sm overflow-hidden", className)}>
            <AvatarFallback className="rounded-sm text-white bg-gradient-to-tr from-cyan-400 to-blue-600 font-semibold text-base uppercase">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    );
};

// Export the component
export default WorkspaceAvatar;