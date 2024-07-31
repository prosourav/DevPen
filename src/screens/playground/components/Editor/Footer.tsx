import React, { useState } from 'react';
// import fullScreen from "../../../../public/assets//fullscreen.svg";
import ImportExport from "../ImportExport";
import { FooterProps } from '../../types';


const Footer: React.FC<FooterProps> = ({ handleExport, handleImport, handleSubmit }) => {
  const [disabled, setDisabled] = useState(false);

  const submit = () => {
    setDisabled(true);
    handleSubmit(setDisabled);
  };

  const handleCodeImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImport(e);
    }

  };

  return (
    <div className='header-bar'>
      {/* <span className="items">
        <img src={fullScreen} alt="Full Screen" height={22} />
        Full Screen
      </span> */}

      <div className='footer-imex'>
        <ImportExport operationId='export' label={'Code'} operation={handleExport} />
        <ImportExport operationId='import' label={'Code (txt)'} importData={handleCodeImport} />
      </div>

      <button
        className={`footer-button ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        onClick={submit}
      >
        {disabled && <div className="spinner"></div>}
        Run Code
      </button>
    </div>
  );
};

export default Footer;
