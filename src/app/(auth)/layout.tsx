// Importing required modules
import React, { ReactNode } from "react";

// Importing custom components
import Logo from "@/components/Logo";

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
            <div className="max-w-5xl mx-auto p-4 h-fit">
                {/* A Navbar for this Auth Layout */}
                <nav className="flex items-center justify-between" >
                    <Logo />
                </nav>

                {/* Rendering the Children components for SignIn and SignUp */}
                <div className="h-[768px] flex flex-col items-center justify-center gap-4 pt-6">
                    {children}
                </div>
            </div>
        </main>
    );
};

// Exporting the layout component for Auth page
export default AuthLayout;