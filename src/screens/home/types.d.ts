interface FileType {
  [key: string]: {
    uuid: string;
    id: string
    language: string;
    code: string;
  }
}

interface FolderType {
    [key: string]: FileType;
}

interface ModalProps {
  createPlayGround?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void,
  createFolder?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void,
  createFile?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void,
  deleteItem?: () => void
  editItem: (data: string, success: (isTrue: boolean) => void) => void
}

interface EditModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  updateFolder: (data: string, success: (isTrue: boolean) => void) => void;
  info: string;
  isFile: boolean;
}

interface DeletePlayGroundProps {
  isModalOpen: boolean;
  closeModal: () => void;
  info: string
  deleteOperation: () => void;
}

interface CreatePlayGroundProps {
  isModalOpen: boolean; // Changed to boolean
  closeModal: () => void;
  createPlayGround?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void;
  createFolder?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void;
  createFile?: (data: Record<string, string>, success: (isTrue: boolean) => void) => void;

}

interface ModalErrors {
  file: string;
  folder: string;
}

interface FolderPropType {
  folderName: string;
  items: FileType,
}

interface FileProp {
  id: string;
  uId: string
  parentFolder: string;
  name: string;
  lang: string;
  handleEdit: (folder: boolean) => void;
  handleDelete: () => void;
}

// interface CreateFolderProps {
//   isModalOpen: boolean;
//   closeModal: () => void;
//   createFolder: (data: Record<string, string>, success: (isTrue: boolean) => void) => void;
// }

// interface CreatePlayGroundProps {
//   isModalOpen: true;
//   closeModal: () => void;
//   createFile: (data: Record<string, string>, success: (isTrue: boolean) => void) => void;
// }