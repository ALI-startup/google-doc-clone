'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParam } from "@/hooks/use-search-param";
import { SearchIcon, XIcon } from "lucide-react"
import { useRef, useState } from "react";

const SearchInput = () => {

    const [search, setSearch] = useSearchParam();
    const [value, setValue] = useState<string>(search);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleClear = () => {
        setValue("")
        setSearch("")
        inputRef.current?.blur();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
    }


    return (
        <div className="flex-1 flex items-center justify-center">
            <form
                // this is made relative so that any children with aboslute class will take this form as a reference
                className="relative max-w-[720px] w-full"
                onSubmit={handleSubmit}
            >
                <Input
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    placeholder="Search"
                    // large padding on both left and right to put the search icon and cross icons
                    className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    // combination (top-1/2 and -translate-y-1/2) is the standard way to vertically center an absolutely positioned element
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                >
                    <SearchIcon />
                </Button>

                {value && (
                    <Button
                        onClick={handleClear}
                        type="button" // <Button> inside a form is automatically considered as a submit button so if we don't change this type, it may clear input before it is passed
                        variant="ghost"
                        size="icon"
                        // combination (top-1/2 and -translate-y-1/2) is the standard way to vertically center an absolutely positioned element
                        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
                    >
                        <XIcon />
                    </Button>
                )}

            </form>
            
        </div>
    )
}
export default SearchInput