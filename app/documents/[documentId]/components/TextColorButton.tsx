import { useEditorStore } from '@/store/use-editor-store'

// Be careful that if you import from radix-ui, it will result in transparent background
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import React from 'react'
import { type ColorResult, SketchPicker} from "react-color"

const TextColorButton = () => {

    const { editor } = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000";

    const onChange = ( color: ColorResult ) => {
        editor?.chain().focus().setColor(color.hex).run();
    };
        
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    >
                    <span className='text-xs'>A</span>
                    <div className='h-0.5 w-full'  style={{ backgroundColor: value }}/>
                </button>                
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default TextColorButton
