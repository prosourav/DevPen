import React, { ChangeEvent } from 'react';
import fullScreen from "../../../../assets/fullscreen.svg";
import ImportExport from "../ImportExport";

export interface ExportType {
  code: string;
  file: string;
}

interface FooterProps {
  handleExport: () => ExportType | undefined;
  handleImport: (e?: ChangeEvent<HTMLInputElement>) => void;
}

const Footer: React.FC<FooterProps> = ({ handleExport, handleImport }) => {
  return (
    <div className='header-bar'>
      <span className="items">
        <img src={fullScreen} alt="" height={22} />
        Full Screen
      </span>
      <ImportExport operationId='export' label={'Code'} operation={handleExport} />
      <ImportExport operationId='import' label={'Code (txt)'} operation={handleImport} />
      <button className="footer-button" onClick={() => { /* Add your run code logic here */ }}>Run Code</button>
    </div>
  );
};

export default Footer;