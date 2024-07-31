import DirectoryInfoProvider from "./provider/directory-info-provider";
import ModalProvider from "./provider/modal-provider";
import PlayGroundProvider from "./provider/playground-provider";
import EditorThemeProvider from "./provider/playground-theme-provider";
import AppRoute from "./router";
import 'devicon/devicon.min.css';

function App() {

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
