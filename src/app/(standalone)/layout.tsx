// Import required modules
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Import custom components
import Logo from "@/components/Logo";
import UserButton from "@/features/auth/components/UserButton";

// Import custom server actions
import { getCurrent } from "@/features/auth/server";

// Defining the props interface for Standalone layout component
interface StandaloneLayoutProps {
    children: React.ReactNode;
};

const StandaloneLayout = async ({ children }: StandaloneLayoutProps) => {
    // Get the currently authenticated user
    const currentUser = await getCurrent();
    if (!currentUser) {
        redirect("/sign-in");
    }

    return (
        <main className="min-h-screen w-full">
            <div className="mx-auto max-w-screen-2xl p-2 md:p-4">
                <nav className="flex items-center justify-between max-w-[85%] mx-auto">
                    <Link href={"/"}>
                        <Logo />
                    </Link>
                    <UserButton />
                </nav>
                <div className="flex flex-col items-center justify-center pt-24">
                    {children}
                </div>
            </div>
        </main>
    );
};

// Export the Standalone layout
export default StandaloneLayout;