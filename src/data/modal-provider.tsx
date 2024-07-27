import React, { createContext, useState, ReactNode } from "react";

type ModalType = string | null;

interface ModalContextType {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  activateModal: ModalType;
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => { },
  closeModal: () => { },
  activateModal: null,
});

interface ModalProviderProps {
  children: ReactNode;
}

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