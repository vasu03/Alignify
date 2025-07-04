// Importing required modules
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

// Importing custom components
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import CreateWorkspaceModal from "@/features/workspaces/components/CreateWorkspaceModal";

// Import custom server actions
import { getCurrent } from "@/features/auth/server";

// Defining the props interface for Dashboard layout component
interface DashboardLayoutProps {
    children: ReactNode;
};

// Defining the Layout component for Dashboard page
const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
    // Get the currently authenticated user
    const currentUser = await getCurrent();
    if (!currentUser) {
        redirect("/sign-in");
    }

    // TSX for rendering the layout component
    return (
        <main className="min-h-screen w-full">
            <CreateWorkspaceModal />
            <div className="flex w-full h-full">
                {/* SIDEBAR */}
                <div className="fixed left-0 top-0 hidden lg:block lg:w-[265px] h-full overflow-y-auto">
                    <Sidebar />
                </div>

                <div className="lg:pl-[265px] w-full">
                    <div className="max-w-screen mx-auto p-2 h-fit">
                        {/* NAVBAR */}
                        <Navbar />

                        {/* Rendering the children component for Dashboard Page */}
                        <div className="h-full flex flex-col p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

// Exporting the Dashboard Layout
export default DashboardLayout;