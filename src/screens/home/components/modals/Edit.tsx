import React, { useEffect } from 'react';
import useModal from '../../../../hooks/useModal';

interface EditModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  updateFolder: (data: string) => void;
  info: string;
}


const EditModal: React.FC<EditModalProps> = ({ isModalOpen, closeModal, updateFolder, info }) => {
  const { modalRef, handleChange, data, reset, setData } = useModal({ initialValue: { file: info }, closeModal });

  useEffect(() => {
    if (isModalOpen) {
      setData({ file: info });
    } else {
      reset();
    }
  }, [isModalOpen, info]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFolder(data.file);
    setData({ file: '' });
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className='modal' ref={modalRef}>
      <button className="close-button" onClick={closeModal}>
        <span className="material-icons">close</span>
      </button>
      <form onSubmit={handleSubmit}>
        <h3>Update Title <strong style={{ color: 'rgb(136, 136, 186' }}>'{info}'</strong></h3>

        <div>
          <label htmlFor="file">Enter New Title</label>
          <input
            name="file"
            value={data.file}
            type="text"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditModal;