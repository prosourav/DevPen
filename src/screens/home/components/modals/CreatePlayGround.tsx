import React from 'react';
import { languages } from '../../../../constants';
import useModal from '../../../../hooks/useModal';

interface CreatePlayGroundProps {
  isModalOpen: boolean; // Changed to boolean
  closeModal: () => void;
  createPlayGround: (data: Record<string, string>) => void;
}

interface ModalErrors {
  file: string;
  folder: string;
}

const initialValue = {
  folder: '',
  file: '',
  language: 'js',
};

const initialErr: ModalErrors = { file: '', folder: '' };

const CreatePlayGroundModal: React.FC<CreatePlayGroundProps> = ({
  isModalOpen,
  closeModal,
  createPlayGround,
}) => {
  const { modalRef, handleChange, data, reset, err, updateError } = useModal({
    initialValue,
    closeModal,
    initialErr,
  });

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    let errors = { ...initialErr };

    if (data.file.trim() === '') {
      errors = { ...errors, file: 'Invalid input' };
      hasError = true;
    } else if (data.file.length > 16 || data.file.length < 1) {
      errors = { ...errors, file: 'File must be at least 1 to 16 characters' };
      hasError = true;
    }

    if (data.folder.trim() === '') {
      errors = { ...errors, folder: 'Invalid input' };
      hasError = true;
    } else if (data.folder.length > 16 || data.folder.length < 1) {
      errors = { ...errors, folder: 'Folder must be at least 1 to 16 characters' };
      hasError = true;
    }

    updateError(errors);

    if (!hasError) {
      createPlayGround(data);
      reset();
      closeModal();
    }
  };

  return (
    <div className="modal" ref={modalRef}>
      <button className="close-button" onClick={closeModal}>
        <span className="material-icons">close</span>
      </button>

      <form onSubmit={handleSubmit}>
        <h1>Create New Playground</h1>

        <div className='modal-row'>
          <label htmlFor="folder">Enter Folder Name</label>
          <input name="folder" type="text" onChange={handleChange} required />
          {(err as ModalErrors).folder && <span>{(err as ModalErrors).folder}</span>}
        </div>

        <div className='modal-row'>
          <label htmlFor="file">Enter File Name</label>
          <input name="file" type="text" onChange={handleChange} required />
          {(err as ModalErrors).file && <span>{(err as ModalErrors).file}</span>}
        </div>

        <div className='modal-row'>
          <label htmlFor="language">Select Language</label>
          <select name="language" defaultValue="js" onChange={handleChange} required>
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
