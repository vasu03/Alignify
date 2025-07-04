// Import required modules
import React from "react";
import { useMedia } from "react-use";

// Import UI components
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

// Define the props for the component
interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

// Create a Responsive Modal Dialogue box
const ResponsiveModal = ({ children, open, onOpenChange }: ResponsiveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
                    {children}
                </DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
                    {children}
                </div>
            </DrawerContent>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
        </Drawer>
    );
};

// Export the component
export default ResponsiveModal;