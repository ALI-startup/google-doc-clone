import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/rename-dialog";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel"
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react"

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  return (
    <DropdownMenu>
        {/* asChild prop is needed because DropdownMenuTrigger is a button element so we would
        nest button element inside another causing hydration error */}
        {/* asChild makes sure that instead of rendering the default wrapper element, it uses the child element directly as trigger component and it passes all its functionality onto the child */}
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="size-4" />
            </Button>        
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <RenameDialog documentId={documentId} initialTitle={title}>
                {/* preventDefault prevents the default browser behavior (prevents browser's action like focusing, submitting, etc)
                    stopPropagation prevents the event from bubbling up to parent elements (by default dropdown closes after clicking, so prevents that)
                */}
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                    >
                    <FilePenIcon className="size-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
            </RenameDialog>
            <RemoveDialog documentId={documentId}>
                {/* preventDefault prevents the default browser behavior (prevents browser's action like focusing, submitting, etc)
                    stopPropagation prevents the event from bubbling up to parent elements (by default dropdown closes after clicking, so prevents that)
                */}
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                    >
                    <TrashIcon className="size-4 mr-2"/>
                    Remove
                </DropdownMenuItem>
            </RemoveDialog>            
            <DropdownMenuItem onClick={() => onNewTab(documentId)}>
                <ExternalLinkIcon className="size-4 mr-2"/>
                Open in a new tab
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default DocumentMenu