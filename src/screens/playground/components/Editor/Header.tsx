// Header.tsx
import React, { ChangeEvent } from 'react';
import { languages, theme, themes } from '../../../../constants';
import { CurrentFolderType, FileT } from '.';

interface HeaderProps {
  folders: Record<string, Record<string, FileT>>;
  fileInfo: CurrentFolderType;
  updateFolders: (data: Record<string, Record<string, FileT>>) => void;
  edit: (e: React.MouseEvent<HTMLSpanElement>) => void;
  handleLanguageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleThemeChange: (data: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveCode: () => void
  editorTheme: theme
}

const Header: React.FC<HeaderProps> = ({ edit, fileInfo, handleLanguageChange,
  handleThemeChange, editorTheme, handleSaveCode
}) => {

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
          <button className="header-button" onClick={handleSaveCode}>Save Code</button>
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