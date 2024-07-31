// Header.tsx
import React, { useEffect, useState } from 'react';
import { languages, themes } from '../../../../constants';
import Done from "../../../../../public/assets/done.svg";
import { HeaderProps, loadingType } from '../../types';


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
        <div className='wrapper'>
          <h2 className="header-title">
            File: <span className='font-normal'>{fileInfo?.fileName}</span>
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