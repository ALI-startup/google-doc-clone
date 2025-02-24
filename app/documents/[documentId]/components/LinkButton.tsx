import { useEditorStore } from '@/store/use-editor-store'

import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import React, { useState } from 'react'
import { Link2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LinkButton = () => {

    const { editor } = useEditorStore();
    const [value, setValue] = useState<string>("");

    const onChange = (url: string) => {
        editor?.chain().focus().extendMarkRange('link').setLink({ href: url}).run()
        setValue("")
    }

    return (
        <DropdownMenu onOpenChange={(open) => { if (open) setValue(editor?.getAttributes('link').href || "")}}>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    >
                    < Link2Icon className='size-4' />
                </button>                
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center gap-2'>
                <Input 
                    placeholder='https://example.com'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onChange(value);
                    }}
                />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LinkButton
