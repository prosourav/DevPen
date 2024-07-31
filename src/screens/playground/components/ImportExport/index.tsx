import React, { useState } from 'react';
import upload from '../../../../assets/download.svg';
import download from '../../../../assets/upload.svg';
import { ExportType } from '../Editor/Footer';

interface OperationProps {
  operationId: 'import' | 'export';
  label: string;
  operation?: (e?: React.ChangeEvent<HTMLInputElement>) => ExportType | void;
  importData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImportExport: React.FC<OperationProps> = ({ operationId, operation, label, importData }) => {
  const [state, setState] = useState({ content: '', filename: '' });

  if (operationId === 'import') {
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (importData) {
        importData(e);
      }
    };

    return (
      <React.Fragment>
        <label htmlFor={`input-${label}`} className='import-export'>
          <span>
            Import {label}
          </span>
          <img src={upload} alt="" />
        </label>
        <input
          id={`input-${label}`}
          type="file"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
      </React.Fragment>
    );
  }


  if (operationId === 'export') {
    const handleDownload = () => {
      const result = operation?.();
      if (result) {
        setState({ content: result.code, filename: result.file });
      }
    };

    return (
      <a
        className='import-export'
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(state.content)}`}
        download={state.filename}
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
