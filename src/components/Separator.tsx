// Importing required modules
import React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProp {
    className?: String
}

// Creating a Separator component
const Separator = ({ className }: SeparatorProp) => {
    // TSX to render the component
    return (
        <div className={cn("border border-b border-neutral-200 my-3", className)}></div>
    );
};

// Exporting the Separator component
export default Separator;