import React, { useState } from 'react';
import upload from '../../../../assets/download.svg';
import download from '../../../../assets/upload.svg';
import { ExportType } from '../Editor/Footer';

interface OperationProps {
  operationId: 'import' | 'export';
  label: string;
  operation: (e?: React.ChangeEvent<HTMLInputElement>) => ExportType | void;
}

const ImportExport: React.FC<OperationProps> = ({ operationId, operation, label }) => {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('');

  if (operationId === 'import') {
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        operation(e);
      }
    };

    return (
      <>
        <label htmlFor="input" className='import-export'>
          <span>
            Import {label}
          </span>
          <img src={upload} alt="" />
        </label>
        <input id='input' type="file" style={{ display: 'none' }} onChange={handleImport} />
      </>
    );
  }

  if (operationId === 'export') {
    const handleDownload = () => {
      const result = operation();
      if (result) {
        setContent(result.code);
        setFilename(result.file);
      }
    };

    return (
      <a
        className='import-export'
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(content)}`}
        download={filename}
        onClick={handleDownload}
      >
        <span>
          Export {label}
        </span>
        <img src={download} alt="" />
      </a>
    );
  }

  return null;
};

export default ImportExport;
