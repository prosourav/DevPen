import useModal from "../../../../hooks/useModal";

interface DeletePlayGroundProps {
  isModalOpen: boolean;
  closeModal: () => void;
  info: string
  deleteOperation: () => void;
}


const DeleteConfirm: React.FC<DeletePlayGroundProps> = ({ isModalOpen, closeModal, deleteOperation, info }) => {
  const { modalRef } = useModal({ closeModal });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); deleteOperation(); closeModal() };


  if (!isModalOpen) return null;

  return (
    <div className='modal' ref={modalRef}>
      <button className="close-button" onClick={closeModal}>
        <span className="material-icons">close</span>
      </button>
      <form>
        <div >
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete <strong>{info}</strong>?</p>
          <p>This action cannot be undone.</p>
          <button className="delete-button" onClick={handleSubmit}> Yes Delete</button>

        </div>
   
      </form>
    </div>
  );
};

export default DeleteConfirm;