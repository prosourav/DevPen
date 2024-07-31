import CodeMirror from '@uiw/react-codemirror';
import { getLanguageExtension, getTheme } from '../../../../constants';
import { EditorProps } from '../../types';


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