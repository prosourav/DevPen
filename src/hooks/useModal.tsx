/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface UseModalProps{
  closeModal: () => void;
  initialValue?: Record<string, string>;
}

const useModal = ({ closeModal, initialValue }: UseModalProps) => {
  const [formValue, setFormValue] = useState({ ...initialValue });
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
    const { name, value } = e.target;
    setFormValue(prevData => ({ ...prevData, [name]: value }));
  };


  return {
    modalRef,
    handleChange,
    data: formValue,
    setData:setFormValue,
    reset: () => setFormValue({...initialValue}),
  }
};

export default useModal;