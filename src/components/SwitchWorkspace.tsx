"use client";

// Import required modules
import React from "react";
import { useRouter } from "next/navigation";

// Import UI components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import custom components
import WorkspaceAvatar from "@/features/workspaces/components/WorkspaceAvatar";

// Import Icons
import { RiAddCircleFill } from "react-icons/ri";
import { LoaderIcon } from "lucide-react";

// Import custom APIs
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

// Import custom hooks
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

// Creating a SwitchWorkspace for the Dashboard Page
const SwitchWorkspace = () => {
    // grab the workspace data from api
    const { data: workspaces, isPending } = useGetWorkspaces();
    const router = useRouter();

    // initialize custom hooks
    const workspaceId = useWorkspaceId();
    const { open } = useCreateWorkspaceModal();

    // Function to handle to selection of workspace
    const handleSelectWorkspace = async (id: string) => {
        router.push(`/workspaces/${id}`);
    }

    // TSX to render the component
    return (
        <div className="flex flex-col gap-y-3 my-4">
            <div className="flex items-center justify-between">
                <p className="text-neutral-700 font-semibold text-base">Workspaces</p>
                <RiAddCircleFill onClick={open} className="text-neutral-600 size-5 cursor-pointer hover:opacity-75 transition-all" />
            </div>
            <Select onValueChange={handleSelectWorkspace} value={workspaceId || ""}>
                <SelectTrigger className="w-full bg-neutral-200 font-medium px-2 py-4">
                    {/* <SelectValue placeholder="No Workspace selected" /> */}
                    {isPending ? (
                        <span className="flex items-center justify-center w-full">
                            <LoaderIcon className="animate-spin" />
                        </span>
                    ) : (
                        <SelectValue placeholder="No Workspace selected" />
                    )}
                </SelectTrigger>
                <SelectContent className="py-2">
                    {isPending ? (
                        <div className="flex items-center justify-center w-full">
                            <LoaderIcon className="animate-spin text-neutral-500" />
                        </div>
                    ) : (
                        <>
                            {workspaces?.data.length !== 0 ? workspaces?.data.map((workspace, idx) => {
                                return (
                                    <SelectItem key={idx} value={workspace.id} className="cursor-pointer">
                                        <div className="flex items-center justify-start gap-3 font-medium">
                                            <WorkspaceAvatar image={workspace.imageUrl} name={workspace.name} />
                                            <span className="truncate text-neutral-800">{workspace.name}</span>
                                        </div>
                                    </SelectItem>
                                )
                            }) : (
                                <div className="w-full flex items-center justify-center font-medium text-neutral-400 text-sm">No Workspaces</div>
                            )}
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

// Exporting the component;
export default SwitchWorkspace;
