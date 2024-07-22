import { useEffect, useRef } from 'react';

interface UseModalProps{
  closeModal: () => void;
}

const useModal = ({closeModal}: UseModalProps) => {

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


  return {
    modalRef
  }
};

export default useModal;