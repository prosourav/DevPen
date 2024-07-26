import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import Result from "./components/Result";

const PlayGround = () => {

  return (
    <>
      <Navbar isFullscreen={false} />
      <div className="playground-container">
        <Editor />
        <Result />
      </div>

    </>
  );
};

export default PlayGround;