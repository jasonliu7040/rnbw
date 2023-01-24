import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as monaco from 'monaco-editor';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import * as config from '@_config/main';
import {
  fnSelector,
  globalSelector,
  MainContext,
  updateFileContent,
} from '@_redux/main';
import Editor, {
  loader,
  Monaco,
} from '@monaco-editor/react';

import { CodeViewProps } from './types';

loader.config({ monaco })

export default function CodeView(props: CodeViewProps) {
  const dispatch = useDispatch()

  // main context
  const {
    addRunningActions, removeRunningActions,
    ffHoveredItem, setFFHoveredItem, ffHandlers, ffTree, updateFF,
    fnHoveredItem, setFNHoveredItem, nodeTree, setNodeTree, validNodeTree, setValidNodeTree,
    updateOpt, setUpdateOpt,
    currentCommand, setCurrentCommand,
    pending, setPending, messages, addMessage, removeMessage,
  } = useContext(MainContext)

  // redux state
  const { project, currentFile } = useSelector(globalSelector)
  const { focusedItem } = useSelector(fnSelector)

  // -------------------------------------------------------------- Sync --------------------------------------------------------------
  // focusedItem - code select
  useEffect(() => {
    // validate
    if (monacoRef.current === null || focusedItem === 'ROOT') return

    let node = validNodeTree[focusedItem]
    if (node === undefined) return

    // select and reveal the node's code sector
    const { startLineNumber, startColumn, endLineNumber, endColumn } = node.data
    const editor = monacoRef.current as monaco.editor.IEditor
    editor.setSelection({
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
    })
    editor.revealRangeInCenter({
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
    }, 1/* scrollType - smooth */)
  }, [focusedItem])

  // content - code
  useEffect(() => {
    // skil its own state change
    if (updateOpt.from === 'code') return

    codeContent.current = currentFile.content
  }, [currentFile.content])

  // code -> content
  const codeContent = useRef<string>(currentFile.content)
  const reduxTimeout = useRef<NodeJS.Timeout | null>(null)
  const saveFileContentToRedux = useCallback(() => {
    // skip the same content
    if (currentFile.content === codeContent.current) return

    console.log('codeView-content')

    setUpdateOpt({ parse: true, from: 'code' })

    addRunningActions(['processor-content', 'processor-validNodeTree'])

    setTimeout(() => dispatch(updateFileContent(codeContent.current)), 0)

    reduxTimeout.current = null
  }, [currentFile.content, updateOpt])
  const handleEditorChange = useCallback((value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) => {
    if (currentFile.uid === '') return

    codeContent.current = value || ''

    // update redux with debounce
    reduxTimeout.current !== null && clearTimeout(reduxTimeout.current)
    reduxTimeout.current = setTimeout(saveFileContentToRedux, config.CodeViewSyncDelay)
  }, [currentFile.uid, saveFileContentToRedux])
  // -------------------------------------------------------------- Sync --------------------------------------------------------------

  // monaco-editor instance
  const monacoRef = useRef<monaco.editor.IEditor | null>(null)
  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor
  }

  // monaco-editor options
  const [tabSize, setTabSize] = useState<number>(2)

  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on')
  const toogleWrap = () => setWordWrap(wordWrap === 'on' ? 'off' : 'on')

  const [language, setLanguage] = useState('html')

  return <>
    <div className='box'>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage={"html"}
        language={language}
        defaultValue={""}
        value={codeContent.current}
        theme="vs-dark"
        // line={line}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          // enableBasicAutocompletion: true,
          // enableLiveAutocompletion: true,
          // enableSnippets: true,
          // showLineNumbers: true,
          tabSize: tabSize,
          wordWrap: wordWrap,
        }}
      />
    </div>
  </>
}