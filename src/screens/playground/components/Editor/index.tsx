import { useContext } from 'react';
import { PlaygroundContext, PlaygroundContextType } from '../../../../data/playground-provider';
import { useParams } from 'react-router-dom';
import { getFileInfo } from '../../../../utils/formatUrl';
import { languages } from '../../../../constants';
import useModal from '../../../../hooks/useModal';
import { createPortal } from 'react-dom';
import Modal from '../../../home/components/modals';

const Editor = () => {
  const { id } = useParams();
  const { modalContainer } = useModal()
  const { folders } = useContext<PlaygroundContextType>(PlaygroundContext);

  const data = getFileInfo(id as string, folders);

  // console.log(data);

  const editItem = () => {

  };


  // const edit = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   handleEdit(); 
  //   updatePointer(id);
  // }


  return (
    <>
      {modalContainer && createPortal(
        <Modal {...{ editItem }} />, modalContainer
      )}
      <div style={{}}>
        <div className="header-bar">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <h2 className="header-title"> File: <span style={{ fontWeight: '400' }}>{data?.fileName}</span></h2>
            <span className="material-icons icon folder-icon header-icon" >
              edit
            </span>
            <button className="header-button">Save</button>
          </div>

          <div className="header-controls">

            <select
              className="header-select"
              name="language"
              defaultValue="js"
              onChange={() => console.log("Language changed!")}
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
              defaultValue="green"
              onChange={() => console.log("Theme changed!")}
              required
            >
              <option value="green">green</option>
              <option value="blue">blue</option>
            </select>
          </div>
        </div>
        <div style={{ background: 'yellow', height: '73vh' }}></div>
        <div></div>
      </div>
    </>
  );
};

export default Editor;