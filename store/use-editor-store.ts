import { create } from "zustand";
import { type Editor } from "@tiptap/react"

interface EditorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null ) => void // Accept Editor Prop
}

export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({editor})
}))

