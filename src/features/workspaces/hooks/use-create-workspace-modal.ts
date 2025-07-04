// Import required modules
import { useQueryState, parseAsBoolean } from "nuqs";

// A hook to manage open/close behavior of Modal
export const useCreateWorkspaceModal = () => {
    // state variable to check if modal is open or not
    const [isOpen, setIsOpen] = useQueryState(
        "create-workspace",     // url param that controls the state
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
    );

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close, setIsOpen };
};