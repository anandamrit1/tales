import React from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { API, OutputData } from '@editorjs/editorjs'

// @ts-ignore
import Paragraph from '@editorjs/paragraph'
// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import Code from '@editorjs/code'
// @ts-ignore
import Image from '@editorjs/image'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import CheckList from '@editorjs/checklist'
// @ts-ignore
import edjsParser from 'editorjs-parser'

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<OutputData>

  render(data: OutputData): Promise<void>
}

const blocks = {
  time: 1635603431943,
  blocks: [
    {
      id: "sheNwCUP5A",
      type: "paragraph",
      data: {
        text: "Editor.js",
        level: 2
      }
    }
  ]
}

type EditorToolsProps = {
  onChange: (data: string) => void
}

function EditorTools({ onChange }: EditorToolsProps) {
  // const [blogData, setBlogData] = React.useState<string>("")
  const [editorData, setEditorData] = React.useState<OutputData>(blocks)

  const ReactEditorJS = createReactEditorJS()
  const editorCore = React.useRef(null)
  const parser = new edjsParser();

  const handleInitialize = React.useCallback((instance: any) => {
    editorCore.current = instance
  }, [])

  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(parser.parse(savedData.blocks))
  }, [])

  const handleChange = async(data: API) => {
    setEditorData(await data.saver.save())
    const parsedData = parser.parse(await data.saver.save())
    onChange(parsedData)
  }


  return (
    <div className='w-screen mx-auto'>
      <ReactEditorJS 
        defaultValue={editorData} 
        tools={{ 
          paragraph: Paragraph,
          embed: Embed,
          list: List,
          code: Code,
          image: Image,
          header: Header,
          quote: Quote,
          checklist: CheckList
        }}
        value={blocks}
        onChange={(data) => handleChange(data)}
        onInitialize={handleInitialize}
      />
    </div>
  )
}

export default EditorTools

