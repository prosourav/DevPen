import useModal from '../../../../hooks/useModal';

interface CreatePlayGroundProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CreateFolderModal: React.FC<CreatePlayGroundProps> = ({ isModalOpen, closeModal }) => {
  const { modalRef } = useModal({ closeModal });

  if (!isModalOpen) return null;

  return (
    <div className='modal' ref={modalRef}>
      <form>
        <h1>Create New Folder</h1>

        <div>
          <label htmlFor="file">Enter Folder Name</label>
          <input name="file" type="text" required />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateFolderModal;