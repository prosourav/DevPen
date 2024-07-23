import useModal from '../../../../hooks/useModal';

interface CreatePlayGroundProps {
  isModalOpen: true;
  closeModal: () => void;
  createFolder: (data: Record<string, string>) => void;
}

const initialValue = {
  file: ''
}

const CreateFolderModal: React.FC<CreatePlayGroundProps> = ({ isModalOpen, closeModal, createFolder }) => {
  const { modalRef, handleChange, data, reset } = useModal({ initialValue, closeModal });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); createFolder(data); reset(); closeModal() };


  if (!isModalOpen) return null;

  return (
    <div className='modal' ref={modalRef}>
      <button className="close-button" onClick={closeModal}>
        <span className="material-icons">close</span>
      </button>
      <form onSubmit={handleSubmit}>
        <h1>Create New Folder</h1>

        <div>
          <label htmlFor="file">Enter Folder Name</label>
          <input name="file" type="text" onChange={handleChange} required />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateFolderModal;