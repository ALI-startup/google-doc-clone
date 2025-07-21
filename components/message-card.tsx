import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { format } from "date-fns";
import Image from "next/image";


interface UserMessageProps {
    content: string
}

const UserMessage = ({ content }: UserMessageProps) => {
    return (
        <div className="flex justify-end pb-4 pr-2 pl-10">
            <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
                {content}
            </Card>

        </div>
    )
}


interface AssistantMessageProps {
    content: string;
    fragment: string | null;
    createdAt: string;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: string) => void;
    type: 'file' | 'text' | 'ERROR';
}


const AssistantMessage = ({
    content,
    fragment,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type
}: AssistantMessageProps ) => {
    return (
        // Perfect method to make this as a group so that whatever happens, we can determine action afterwards
        // like group hover then change the opacity...
        <div className={cn(
            "flex flex-col group px-2 pb-4",
            type === "ERROR" && "text-red-700 dark:text-red-500",
        )}>
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image
                    src="/SamuGen-03.png"
                    alt="SamuGen"
                    width={20}
                    height={20}
                    className="shrink-0"
                />
                <span className="text-sm font-medium">SamuGen</span>
                <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    {format(createdAt, "HH:mm 'on' MMMM dd, yyyy")}
                </span>
            </div>
            <div className="pl-9 flex flex-col gap-y-4">
                <span>
                    {content}
                </span>
            </div>

        </div>
    )

}

interface MessageCardProps {
    content: string;
    role: 'USER' | 'ASSISTANT' | 'SYSTEM';
    fragment: string | null;
    createdAt: string;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: string) => void;
    type: 'file' | 'text' | 'ERROR';
}


const MessageCard = ({
    content,
    role,
    fragment,
    createdAt,
    isActiveFragment,
    onFragmentClick,
    type
}: MessageCardProps) => {

    if (role === "ASSISTANT") {
        return (
            <AssistantMessage 
                content={content}
                fragment={fragment}
                createdAt={createdAt}
                isActiveFragment={isActiveFragment}
                onFragmentClick={onFragmentClick}
                type={type}
            />
        )
    } 

    return (
        <UserMessage content={content}/>
    )

}


export default MessageCard