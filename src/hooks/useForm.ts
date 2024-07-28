/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useRef, useState } from 'react';

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




const useForm = ({ closeModal, initialValue, initialErr }: useFormProps) => {
  const [formValue, setFormValue] = useState({ ...initialValue });
  const [err, setErr] = useState(initialErr);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const { name, value } = e.target;
    setFormValue(prevData => ({ ...prevData, [name]: value }));
    return Object.keys(initialErr as ModalErrors).length ?
      setErr((prevErr) => ({ ...(prevErr as ModalErrors), [name]: '' })) :
      setErr(initialErr);

  };

  const reset = () => {
    setFormValue({ ...initialValue });
    setErr(initialErr);
  };


  return {
    modalRef,
    handleChange,
    data: formValue,
    setData: setFormValue,
    err,
    updateError: setErr,
    reset,
  }
};

export default useForm;
