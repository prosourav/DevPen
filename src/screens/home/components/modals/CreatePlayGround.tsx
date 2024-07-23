import { languages } from '../../../../constants';
import useModal from '../../../../hooks/useModal';

interface CreatePlayGroundProps {
  isModalOpen: true; 
  closeModal: () => void; 
  createPlayGround: (data: Record<string, string>) => void;
}

const initialValue = {
  folder:"",
  file:"",
  language:"js"
}

const CreatePlayGroundModal: React.FC<CreatePlayGroundProps> = ({ isModalOpen, closeModal, createPlayGround }) => {
  const { modalRef, handleChange, data, reset } = useModal({ initialValue, closeModal });


  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); createPlayGround(data); reset(); closeModal()  };

  return (
    <div className='modal' ref={modalRef}>
      <button className="close-button" onClick={closeModal}>
        <span className="material-icons">close</span>
      </button>

  
      <form onSubmit={handleSubmit}>
        <h1>Create New Playground</h1>

        <div>
          <label htmlFor="folder">Enter Folder Name</label>
          <input name="folder" type="text" onChange={handleChange} required/>
        </div>

        <div>
          <label htmlFor="file">Enter File Name</label>
          <input name="file" type="text" onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="language">Select Language</label>
          <select name="language" defaultValue={"js"} onChange={handleChange} required>
            {languages.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePlayGroundModal;