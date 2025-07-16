import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        lineHeight: {
            /**
             * Set the Line Height
             * @param lineHeight The height of the line
             * @example editor.commands.setLineHeight('1')
             */
            setLineHeight: (lineHeight: string) => ReturnType,

            /**
             * Unset the Line Height
             * @example editor.commands.unsetLineHeight()
             */
            unsetLineHeight: () => ReturnType,
        }
    }
}

export type LineHeightOptions = {
    /**
     * A list of node names where the font size can be applied
     * @default ['heading', 'paragraph']
     * @example ['paragraph']
     */
    types: string[],

    /**
     * The default line height to start with 
     * @default 'normal'
     * @example '1'
     */
    defaultLineHeight: string,
}


/**
 * This extension allows you to set a line height for a header, paragraph
 */
export const LineHeightExtension = Extension.create<LineHeightOptions>({
    name: "lineHeight",
    addOptions() {
        return {
            types: ["paragraph", "heading"],
            defaultLineHeight: "normal"
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: this.options.defaultLineHeight,
                        parseHTML: element => {
                            return element.style.lineHeight || this.options.defaultLineHeight
                        },
                        renderHTML: attributes => {
                            if (!attributes.lineHeight) return {}
                            return {
                                style: `line-height: ${attributes.lineHeight}`,
                            }
                        }
                    }
                }
            }
        ]
    },


    addCommands() {
        return {
            // tr stands for transaction
            setLineHeight: (lineHeight: string) => ({ tr, state, dispatch }) => {
                const { selection } = state;
                tr = tr.setSelection(selection);

                const { from, to } = selection;
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight
                        })
                    }
                })

                if (dispatch) dispatch(tr);
                return true;
            },

            unsetLineHeight: () => ({ tr, state, dispatch }) => {
                const { selection } = state;
                tr = tr.setSelection(selection);

                const { from, to } = selection;
                state.doc.nodesBetween(from, to, (node, pos) => {

                    if (this.options.types.includes(node.type.name)){
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight: this.options.defaultLineHeight
                        })
                    }
                })

                if (dispatch) dispatch(tr)
                return true;
            }
        }
    }
})

