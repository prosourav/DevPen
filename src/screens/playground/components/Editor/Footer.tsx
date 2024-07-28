import fullScreen from "../../../../assets/fullscreen.svg"
import download from '../../../../assets/download.svg';
import upload from '../../../../assets/upload.svg';

const Footer = () => {
  return (
    <div className='header-bar'>
      <span className="items">
        <img src={fullScreen} alt="" height={22} />
        Full Screen
      </span>

      <div className='import-export'>
        <span>
          Export File
        </span>
        <img src={upload} alt="" />
      </div>

      <div className='import-export'>
        <span>
          Import File
        </span>
        <img src={download} alt="" />
      </div>

      <button className="footer-button" onClick={()=>{}}>Run Code</button>
    </div>

  );
};

export default Footer;