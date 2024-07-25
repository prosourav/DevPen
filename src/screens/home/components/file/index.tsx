import { useContext } from "react";
import { DirectoryContext } from "../../../../data/directory-info-provider";
import { iconClasses } from "../../../../constants";
import { Link } from "react-router-dom";
import { formatUrl } from "../../../../utils/formatUrl";

interface FileProp {
  id: string;
  name: string;
  lang: string;
  handleEdit: () => void;
  handleDelete: () => void;
}

const File = ({ name, lang, id, handleDelete, handleEdit }: FileProp) => {
  const { updatePointer } = useContext(DirectoryContext);

  const edit = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEdit(); updatePointer(id);
  }
  const deleteOp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDelete(); updatePointer(id)
  };

  return (
    <Link to={formatUrl(id)} className='file'>
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