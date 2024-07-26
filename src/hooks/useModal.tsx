import { useEffect, useState } from "react";

const useModal = () => {
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    setModalContainer(document.getElementById('modals'));
  }, []);


  return {
    modalContainer
  }
};

export default useModal;