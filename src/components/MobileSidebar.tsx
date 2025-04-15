"use client"

// Inporting required modules
import React, { useState } from "react";

// Importing UI components
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

// Importing custom components
import Sidebar from "./Sidebar";

// Importing lucide icons
import { MenuIcon } from "lucide-react";

// Creating a component for Sidebar in Mobile Screens
const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const pathname = usePathname();

    // useEffect(() => {
    //     setIsOpen(true);
    // }, [pathname])

    // TSX to render the component
    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button size={"icon"} variant={"secondary"} className="lg:hidden">
                    <MenuIcon className="size-6 text-neutral-800" />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0" >
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

// Exporting the component
export default MobileSidebar;