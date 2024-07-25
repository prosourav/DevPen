import { languages } from '../../../../constants';
import useModal from '../../../../hooks/useModal';

interface CreatePlayGroundProps {
  isModalOpen: true;
  closeModal: () => void;
  createFile: (data: Record<string, string>) => void;
}

const initialValue = {
  file: '',
  language: 'js',
}

const CreateFileModal: React.FC<CreatePlayGroundProps> = ({ isModalOpen, closeModal, createFile }) => {
  const { modalRef, handleChange, data, reset, err, updateError } = useModal({ initialValue, closeModal, initialErr:'' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.file.trim() === '') {
      return updateError('Invalid file name');
    }
    if (data.file.length > 16 || data.file.length < 1) {
      return updateError('File must be at least 1 character to 12');
    }

    if (!err) {
      createFile(data); reset(); closeModal()
    }
  };


  if (!isModalOpen) return null;

  return (
    <div className='modal' ref={modalRef}>
      <button className="close-button" onClick={closeModal}>
        <span className="material-icons">close</span>
      </button>
      <form onSubmit={handleSubmit}>
        <h1>Create New File</h1>

        <div className='modal-row'>
          <label htmlFor="file">Enter File Name</label>
          <input name="file" type="text" onChange={handleChange} required />
          {err && <span>{err as string}</span>}
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

export default CreateFileModal;