import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'


export type FontSizeOptions = {
    /**
     * A list of node names where the font size can be applied
     * @default ['textStyle']
     * @example ['heading', 'paragraph']
     */
    types: string[],

    /**
     * The default font size to start with when no size is set
     * @default '16'
     * @example '14'
     */
    defaultSize: string,

}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            /**
             * Set the font size
             * @param fontSize The size of the font
             * @example editor.commands.setFontSize('10')
             */
            setFontSize: (fontSize: string) => ReturnType,

            /**
             * Unset the font size
             * @example editor.commands.unsetFontSize()
             */
            unsetFontSize: () => ReturnType,
        }
    }
}


/**
 * This extension allows you to set a font size for a text
 */
export const FontSize = Extension.create<FontSizeOptions>({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
            defaultSize: '16',
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: this.options.defaultSize,
                        parseHTML: element => element.style.fontSize,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {}
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`
                            }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize })
                    .run()
            },

            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null})
                    .removeEmptyTextStyle() // Remove the <span> tags without an inline style
                    .run()
            },
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Shift-.': () => {
                const currentSize = this.editor.getAttributes('textStyle').fontSize;
                const size = currentSize ? parseInt(currentSize) : parseInt(this.options.defaultSize);
                return this.editor.commands.setFontSize(`${size+1}px`)
            },
            'Mod-Shift-,': () => {
                const currentSize = this.editor.getAttributes('textStyle').fontSize;
                const size = currentSize ? parseInt(currentSize) : parseInt(this.options.defaultSize);
                
                // Put a limit to the lowest fontsize
                if (size > 1) {
                    return this.editor.commands.setFontSize(`${size-1}px`)
                }
                else {
                    return true
                }            
            }
        }
    },
})

