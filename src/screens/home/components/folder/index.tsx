import { useContext } from "react";
import File from "../file";
import { ModalContext } from "../../../../provider/modal-provider";
import { DirectoryContext } from "../../../../provider/directory-info-provider";


const Folder = ({ folderName, items }: FolderPropType) => {
  const modalFeatures = useContext(ModalContext);
  const { updatePointer } = useContext(DirectoryContext);

  const playGround: Record<string, string>[] = [];
  Object.entries(items).forEach(([key, value]) => {
    const dataItem = { ...value as object, name: key };
    playGround.push(dataItem);
  });


  const handleOpen = () => { modalFeatures.openModal('create-file'); updatePointer(folderName) };
  const handleDelete = () => { modalFeatures.openModal('delete'); updatePointer(folderName) };

  const handleEdit = (folder: boolean) => {
    modalFeatures.openModal('edit');
    folder && updatePointer(folderName);
  };

  const handleEditOp = () => handleEdit(true);

  return (
    <>
      <div className='new-playground'>

        <div className="folder-info">
          <span className="material-icons material-icons-outlined folder">
            folder
          </span>
          <p className="folder-title">{folderName}</p>
        </div>

        <div className="folder-nav">
          <span className="material-icons icon folder-icon" onClick={handleEditOp}>
            edit
          </span>

          <span className="material-icons icon folder-icon" onClick={handleDelete}>
            delete
          </span>

          <span className='add' onClick={handleOpen}>
            <span className="material-icons">
              add
            </span>
            Create Playground
          </span>
        </div>

      </div>
      <div className="folder-container">
        {
          playGround.map(item => <File key={item.uuid} name={item.name} uId={item.uuid} id={item.id}
            handleDelete={handleDelete} lang={item.language} handleEdit={handleEdit} parentFolder={folderName} />)
        }
      </div>
    </>
  );
};

export default Folder;