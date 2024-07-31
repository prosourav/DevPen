import { useContext } from "react";
import { DirectoryContext } from "../../../../data/directory-info-provider";
import { iconClasses } from "../../../../constants";
import { Link } from "react-router-dom";
import { encodeUrl } from "../../../../utils/formatUrl";


const File = ({ parentFolder, name, lang, uId, id, handleDelete, handleEdit }: FileProp) => {
  const { updatePointer } = useContext(DirectoryContext);
  const nextURL = `/playground/${id}_${encodeUrl(parentFolder)}`

  const edit = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEdit(false);
    updatePointer(uId);
  }
  const deleteOp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDelete();
    updatePointer(uId)
  };

  return (
    <Link to={nextURL} className='file'>
      <div className="file-info">

        <i className={iconClasses[lang] || ''} />

        <div>
          <p className="file-title ">{name.length > 12 ? name.substring(0, 10) + '...' : name}</p>
          <span className="language">Language: {lang}</span>
        </div>
      </div>

      <div>
        <span className="material-icons op-icon" onClick={edit}>
          edit
        </span>

        <span className="material-icons op-icon" onClick={deleteOp}>
          delete
        </span>
      </div>
    </Link>
  );
};

export default File;