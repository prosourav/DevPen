/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface UseModalProps{
  closeModal: () => void;
  initialValue: Record<string, string>;
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
    formValue[e.target.name] = e.target.value;
  };


  return {
    modalRef,
    handleChange,
    data: formValue,
    reset: () => setFormValue({...initialValue}),
  }
};

export default useModal;