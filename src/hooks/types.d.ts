interface useFormProps {
  closeModal: () => void;
  initialValue?: Record<string, string>;

}
interface useFormProps {
  closeModal: () => void;
  initialValue?: Record<string, string>;
  initialErr?: ModalErrors | string;
}

interface ModalErrors {
  file: string;
  folder: string;
}

