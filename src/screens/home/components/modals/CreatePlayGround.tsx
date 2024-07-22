import React, { useState } from 'react';
import { languages } from '../../../../constants';
import useModal from '../../../../hooks/useModal';

interface CreatePlayGroundProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CreatePlayGroundModal: React.FC<CreatePlayGroundProps> = ({ isModalOpen, closeModal }) => {
  const [selected, setSelected] = useState<string>('');
  const { modalRef } = useModal({closeModal});


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  if (!isModalOpen) return null;

  return (
    <div className='modal' ref={modalRef}>
      <form>
        <h1>Create New Playground</h1>

        <div>
          <label htmlFor="folder">Enter Folder Name</label>
          <input name="folder" type="text" required />
        </div>

        <div>
          <label htmlFor="file">Enter File Name</label>
          <input name="file" type="text" required />
        </div>

        <div>
          <label htmlFor="language">Select Language</label>
          <select name="language" value={selected} onChange={handleChange} required>
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