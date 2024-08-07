import DirectoryInfoProvider from "./provider/directory-info-provider";
import ModalProvider from "./provider/modal-provider";
import PlayGroundProvider from "./provider/playground-provider";
import EditorThemeProvider from "./provider/playground-theme-provider";
import AppRoute from "./router";
import 'devicon/devicon.min.css';

function App() {


  const key = import.meta.env.VITE_API_KEY;
  const path = import.meta.env.VITE_BASE_PATH;
  const url = import.meta.env.VITE_BASE_URL;
  const host = import.meta.env.VITE_BASE_HOST;


  console.log('key', key);
  console.log('path', path);
  console.log('url', url);
  console.log('host', host);

  return (
    <PlayGroundProvider>
      <DirectoryInfoProvider>
        <ModalProvider>
          <EditorThemeProvider>
            <AppRoute />
          </EditorThemeProvider>
        </ModalProvider>
      </DirectoryInfoProvider>
    </PlayGroundProvider>
  )
}

export default App;
