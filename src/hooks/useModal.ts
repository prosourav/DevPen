import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../provider/modal-provider";

const useModal = () => {
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(null);
  const modalFeatures = useContext(ModalContext);

  useEffect(() => {
    modalFeatures.openModal(null)
    const modalElement = document.getElementById('modals');
    setModalContainer(modalElement);

    return () => {
      setModalContainer(null);
    };
  }, []);


  return {
    modalContainer
  }
};

export default useModal;