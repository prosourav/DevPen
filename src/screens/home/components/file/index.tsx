import { useContext } from "react";
import { DirectoryContext } from "../../../../data/directory-info-provider";

interface FileProp {
  id: string;
  name: string;
  lang: string;
  handleEdit: () => void;
  handleDelete: () => void;
}

const File = ({ name, lang, id, handleDelete, handleEdit }: FileProp) => {
  const { updatePointer } = useContext(DirectoryContext);

  const edit = () => {
    handleEdit(); updatePointer(id);
  }
  const deleteOp = () => { handleDelete(); updatePointer(id) };

  return (
    <div className='file'>
      <div className="file-info">

        {lang == 'python' && <i className="devicon-python-plain colored lan-icon" />}
        {lang == 'java' && <i className="devicon-java-plain colored lan-icon" />}
        {lang == 'js' && <i className="devicon-javascript-plain colored lan-icon" />}
        {lang == 'c++' && <i className="devicon-cplusplus-plain colored lan-icon" />}
        <div>
          <p className="file-title op-icon">{name.length > 12 ? name.substring(0, 10) + '...' : name}</p>
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
    </div>
  );
};

export default File;