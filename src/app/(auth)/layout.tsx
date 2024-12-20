// Importing required modules
import React, { ReactNode } from "react";

// Importing the icons
import { Goal, UserPlus } from "lucide-react";

// Importing the pre-defined UI components
import { Button } from "@/components/ui/button";

// Defining the props interface for Auth layout component
interface AuthLayoutProps {
    children: ReactNode;
};

// Defining the layout component for Auth page
const AuthLayout = ({ children }: AuthLayoutProps) => {
    // TSX for rendering the layout component
    return (
        // Render the Layout for auth pages
        <main className="min-h-screen w-full">
            <div className="max-w-5xl mx-auto p-4">
                {/* A Navbar for this Auth Layout */}
                <nav className="flex items-center justify-between" >
                    <span className="flex items-center gap-1 p-1 cursor-pointer">
                        <Goal className="w-9 h-9 p-2 bg-gradient-to-tr from-cyan-400 to-blue-600 text-primary-foreground rounded-md" />
                        <span className="text-3xl font-bold bg-gradient-to-tr from-cyan-400 to-blue-600 text-transparent bg-clip-text">Alignify</span>
                    </span>
                </nav>

                {/* Rendering the Children components for SignIn and SignUp */}
                <div className="flex flex-col items-center justify-center gap-4 pt-6">
                    {children}
                </div>
            </div>
        </main>
    );
};

// Exporting the layout component for Auth page
export default AuthLayout;