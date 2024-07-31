import useForm from '../../hooks/useForm';

const initialValue = {
  file: ''
}

const CreateFolderModal: React.FC<CreatePlayGroundProps> = ({ isModalOpen, closeModal, createFolder }) => {
  const { modalRef, handleChange, data, reset, err, updateError } = useForm({ initialValue, closeModal, initialErr: '' });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.file.trim() === '') {
      return updateError('Invalid file name');
    }
    if (data.file.length > 16 || data.file.length < 1) {
      return updateError('Folder name must be between 1 and 12 characters');
    }

    if (!err) {
      createFolder?.(data, (isTrue: boolean) => {
        if (isTrue) {
          reset();
          return closeModal();
        }
        return updateError('Folder already exists');
      });
    }
  };


  if (!isModalOpen) return null;

  return (
    <div className='modal' ref={modalRef}>
      <button className="close-button" onClick={closeModal}>
        <span className="material-icons">close</span>
      </button>
      <form onSubmit={handleSubmit}>
        <h1>Create New Folder</h1>

        <div className='modal-row'>
          <label htmlFor="file">Enter Folder Name</label>
          <input name="file" type="text" onChange={handleChange} required />
          {err && <span>{err as string}</span>}

        </div>


        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateFolderModal;