import Navbar from "./components/Navbar";
import CodeEditor from "./components/Editor";
import Result from "./components/Result";
import InputOutputProvider from "../../provider/input-output-provider";

const PlayGround = () => {
  // const [fullScreen, setFullScreen] = useState(false);
  // const handleFullScreen = () => setFullScreen(prv => !prv);

  return (
    <InputOutputProvider>
      <Navbar isFullscreen={true} />
      <div className="playground-container">
        <CodeEditor />
        <Result />
      </div>
    </InputOutputProvider>
  );
};

export default PlayGround;