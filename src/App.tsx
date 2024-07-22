import ModalProvider from "./data/modal-provider";
import PlayGroundProvider from "./data/playground-provider";
import AppRoute from "./router";
import 'devicon/devicon.min.css';

function App() {


  return (
    <PlayGroundProvider>
      <ModalProvider>
        <AppRoute />
      </ModalProvider>
    </PlayGroundProvider>
  )
}

export default App;
