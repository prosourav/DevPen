import { useState, FC, createContext } from "react";
import { InputOutputFeatures, InputOutputDataType } from "./types";


const init: InputOutputFeatures = {
  data: { input: '', output: '' },
  updateData: () => { },
};

export const InputOutputContext = createContext<InputOutputFeatures>(init);

interface InputOutputProviderProps {
  children: React.ReactNode;
}

const InputOutputProvider: FC<InputOutputProviderProps> = ({ children }) => {
  const [data, setData] = useState<InputOutputDataType>({ input: '', output: '' });

  const updateData = (value: InputOutputDataType) => {
    setData(value);
  };

  const inputOutputFeatures: InputOutputFeatures = {
    data,
    updateData,
  };

  return (
    <InputOutputContext.Provider value={inputOutputFeatures}>
      {children}
    </InputOutputContext.Provider>
  );
};

export default InputOutputProvider;
