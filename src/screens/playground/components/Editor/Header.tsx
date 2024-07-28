// Header.tsx
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { languages, theme, themes } from '../../../../constants';
import { CurrentFolderType, FileT } from '.';
import Done from "../../../../assets/done.svg";

interface HeaderProps {
  folders: Record<string, Record<string, FileT>>;
  fileInfo: CurrentFolderType;
  updateFolders: (data: Record<string, Record<string, FileT>>) => void;
  edit: (e: React.MouseEvent<HTMLSpanElement>) => void;
  handleLanguageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleThemeChange: (data: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveCode: (data: Dispatch<SetStateAction<loadingType>>) => void
  editorTheme: theme
}
export type loadingType = 'true' | 'false' | 'in-progress'

const Header: React.FC<HeaderProps> = ({ edit, fileInfo, handleLanguageChange,
  handleThemeChange, editorTheme, handleSaveCode
}) => {
  const [loading, setLoading] = useState<loadingType>('false');

  useEffect(() => {
    if (loading === 'in-progress') {
      setTimeout(() => setLoading('false'), 3000);
    }
  }, [loading]);

  const saveCode = () => {
    setLoading('true');
    handleSaveCode(setLoading);
  };

  return (
    <div>
      <div className="header-bar">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <h2 className="header-title">
            File: <span style={{ fontWeight: 400 }}>{fileInfo?.fileName}</span>
          </h2>
          <span className="material-icons icon folder-icon header-icon" onClick={edit}>
            edit
          </span>
          <button className="header-button" onClick={saveCode}>
            {loading === 'true' && <div className="spinner"></div>}
            Save Code
          </button>
          {loading === 'in-progress' && < img src={Done} alt="done" />}
        </div>

        <div className="header-controls">
          <select
            className="header-select"
            name="language"
            defaultValue={fileInfo?.file?.language}
            onChange={handleLanguageChange}
            required
          >
            {languages.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="header-select"
            name="theme"
            defaultValue={editorTheme}
            onChange={handleThemeChange}
            required
          >
            {
              themes.map((option) => (<option key={option.name} value={option.value}>{option.name}</option>))
            }
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;