import DirectoryInfoProvider from "./data/directory-info-provider";
import ModalProvider from "./data/modal-provider";
import PlayGroundProvider from "./data/playground-provider";
import AppRoute from "./router";
import 'devicon/devicon.min.css';

function App() {

  return (
    <PlayGroundProvider>
      <DirectoryInfoProvider>
        <ModalProvider>
          <AppRoute />
        </ModalProvider>
      </DirectoryInfoProvider>
    </PlayGroundProvider>
  )
}

export default App;
