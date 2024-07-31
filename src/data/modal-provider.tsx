import React, { createContext, useState } from "react";
import { ModalContextType, ModalProviderProps, ModalType } from "./types";



export const ModalContext = createContext<ModalContextType>({
  openModal: () => { },
  closeModal: () => { },
  activateModal: null,
});



const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalType, setModalType] = useState<ModalType>(null);


  const closeModal = () => {
    setModalType(null);
  };

  const modalFeatures = {
    openModal: setModalType,
    closeModal,
    activateModal: modalType
  };

  return (
    <ModalContext.Provider value={modalFeatures}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;