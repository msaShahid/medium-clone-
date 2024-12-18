'use client'

import { useEditor, EditorContent, BubbleMenu, Editor } from '@tiptap/react'
import { Bold, Italic, StrikethroughIcon } from 'lucide-react'

const Tiptap = ({editor}:{editor:Editor | null}) => {
 
  return (
    <>


      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className='space-x-2'>
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`text-white rounded-md p-1 ${editor.isActive('bold') ? 'bg-black' : 'bg-gray-400'}`}
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`text-white rounded-md p-1 ${editor.isActive('italic') ? 'bg-black' : 'bg-gray-400'}`}
          >
             <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`text-white rounded-md p-1 ${editor.isActive('strike') ? 'bg-black' : 'bg-gray-400'}`}
          >
             <StrikethroughIcon/>
          </button>
        </div>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap
