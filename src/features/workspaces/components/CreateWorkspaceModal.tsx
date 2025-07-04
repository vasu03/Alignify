"use client";

// Import required modules
import React from "react";

// Import custom components
import ResponsiveModal from "@/components/ResponsiveModal";
import CreateWorkspaceForm from "./CreateWorkspaceForm";

// Import custom hooks
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

// Create a Responsive Modal to Create New Workspace
const CreateWorkspaceModal = () => {
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close} />
        </ResponsiveModal>
    );
};

export default CreateWorkspaceModal;