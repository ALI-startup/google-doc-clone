'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
import Underline from '@tiptap/extension-underline'

import { useEditorStore } from '@/store/use-editor-store'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { LineHeightExtension  } from '@/extensions/line-height'

// Custom extension
import { FontSize } from '@/extensions/font-size'


// Better practice is to use Named export for components
export const Editor = () => {

    const { setEditor } = useEditorStore();
    const editor = useEditor({

        // These are a list of functions to make sure that editor is up-todate in toolbar section too (editor store)
        onCreate({ editor }) {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onUpdate({ editor }){
            setEditor(editor);
        },
        onSelectionUpdate({ editor }){
            setEditor(editor);
        },
        onTransaction({ editor }){
            setEditor(editor);
        },
        onFocus({ editor }){
            setEditor(editor);
        },
        onBlur({ editor }){
            setEditor(editor);
        }, 
        onContentError({ editor }){
            setEditor(editor);
        },

        editorProps: {
            attributes: {
                style: "padding-left: 56px; padding-right: 56px",
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        extensions: [
            StarterKit,
            Table,
            TableCell,
            TableHeader,
            TableRow,
            TaskList,
            TaskItem.configure({
              nested: true,
            }),
            Image.configure({
                inline: true // FIXME Doesn't seem to be working...
            }),
            ImageResize,
            Underline,
            FontFamily,
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https']
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            FontSize,
            LineHeightExtension.configure({
                types: ["heading","paragraph"],
                defaultLineHeight: "normal"
            })
        ],
        content: `
            <p>This is a sample editor of SamuGen's next update. I am a MS doc-type editor. </p>
            <p>Feel free to play with me and experiment.</p>

            <table border="1" cellpadding="8" cellspacing="0">
            <thead>
                <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Font Size</td>
                <td>Adjust font size options</td>
                <td>To-Do</td>
                </tr>
                <tr>
                <td>Line Height</td>
                <td>Add line height adjustments</td>
                <td>To-Do</td>
                </tr>
                <tr>
                <td>Links</td>
                <td>Enable hyperlinking</td>
                <td>To-Do</td>
                </tr>
                <tr>
                <td>Local Image Upload</td>
                <td>Support for uploading local images</td>
                <td>To-Do</td>
                </tr>
            </tbody>
            </table>
            <img src="https://placehold.co/800x400/6A00F5/white" alt="Sample Image Placeholder" />

      `,
    })

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
        <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}
