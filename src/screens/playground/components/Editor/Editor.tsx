import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { getLanguageExtension, getTheme, theme } from '../../../../constants';
import { MutableRefObject } from 'react';

interface EditorProps {
  language: 'python' | 'c++' | 'java' | 'js';
  code: string;
  onChange?: (value: string) => void;
  editorTheme: theme;
  codeRef: MutableRefObject<ReactCodeMirrorRef | null>;
}

const Editor: React.FC<EditorProps> = ({ language, code, editorTheme, codeRef }) => {
  return (
    <CodeMirror
      ref={codeRef}
      autoFocus={true}
      value={code}
      height="77vh"
      theme={getTheme(editorTheme)}
      extensions={[getLanguageExtension(language)]}
      // onChange={()=>{}}
    />
  );
};

export default Editor;