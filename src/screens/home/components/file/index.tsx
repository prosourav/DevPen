
interface FileProp {
  name: string;
  lang: string;
}

const File = ({ name, lang }: FileProp) => {

  return (
    <div className='file'>
      <div className="file-info">

        {lang == 'python' && <i className="devicon-python-plain colored lan-icon" />}
        {lang == 'java' && <i className="devicon-java-plain colored lan-icon" />}
        {lang == 'js' && <i className="devicon-javascript-plain colored lan-icon" />}
        {lang == 'c++' && <i className="devicon-cplusplus-plain colored lan-icon" />}
        <div>
          <p className="file-title op-icon">{name}</p>
          <span className="language">Language: {lang}</span>
        </div>
      </div>

      <div>
        <span className="material-icons op-icon">
          edit
        </span>

        <span className="material-icons op-icon">
          delete
        </span>
      </div>
    </div>
  );
};

export default File;