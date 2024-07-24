import { useContext } from "react";
import File from "../file";
import { ModalContext } from "../../../../data/modal-provider";
import { DirectoryContext } from "../../../../data/directory-info-provider";


interface FolderPropType {
  folderName: string;
  items: FileType,
}

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
  const handleEdit = () => { modalFeatures.openModal('edit'); updatePointer(folderName) };

  return (

    <>
      <div className='new-playground'>

        <div className="folder-info">
          <span className="material-icons material-icons-outlined" style={{ color: 'rgb(255, 202, 38)', fontVariationSettings: "'FILL' 1" }}>
            folder
          </span>
          <p className="folder-title">{folderName}</p>
        </div>

        <div className="folder-nav">
          <span className="material-icons icon" onClick={handleEdit}>
            edit
          </span>

          <span className="material-icons icon" onClick={handleDelete}>
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
          playGround.map(item => <File key={item.uuid} name={item.name} id={item.uuid}
            handleDelete={handleDelete} lang={item.language} handleEdit={handleEdit} />)
        }
      </div>
    </>
  );
};

export default Folder;