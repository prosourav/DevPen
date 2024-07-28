/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "./components/Navbar";
import CodeEditor from "./components/Editor";
import Result from "./components/Result";
// import { useState } from "react";

const PlayGround = () => {
// const [fullScreen, setFullScreen] = useState(false);
  // const handleFullScreen = () => setFullScreen(prv => !prv);

  return (
    <>
      <Navbar isFullscreen={true} />
      <div className="playground-container">
        <CodeEditor />
        <Result />
      </div>

    </>
  );
};

export default PlayGround;