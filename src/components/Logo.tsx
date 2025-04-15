// Importing required modules
import React from "react";

// Importing Lucide iconse
import { Goal } from "lucide-react";

// Creating a Logo for the application
const Logo = () => {
    // TSX to render the component
    return (
        <span className="flex items-center gap-1 p-1 cursor-pointer">
            <Goal className="w-9 h-9 p-2 bg-gradient-to-tr from-cyan-400 to-blue-600 text-primary-foreground rounded-md" />
            <span className="text-3xl font-bold bg-gradient-to-tr from-cyan-400 to-blue-600 text-transparent bg-clip-text">Alignify</span>
        </span>
    );
};

// Exporting the Logo component
export default Logo;