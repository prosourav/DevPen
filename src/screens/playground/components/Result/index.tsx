import { useContext } from 'react';
import { InputOutputContext } from '../../../../data/input-output-provider';
import ImportExport from '../ImportExport';
import { handleExport } from '../../../../utils/handleExport';
import { readFileContent } from '../../../../utils/readFile';
// import { readFileContent } from '../../../../utils/readFile';

const Result = () => {
  const context = useContext(InputOutputContext);

  if (!context) {
    throw new Error("Result must be used within an InputOutputProvider");
  }

  const { data, updateData } = context;

  const exportData = () => {
    return handleExport(data.output, 'txt');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (context.data) {
      updateData({ ...context.data, input: e.target.value });
    }
  };

  const handeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target?.files && e.target.files.length > 0) {
      readFileContent(e.target.files[0]).then((content) => {
        updateData({ ...context.data, input: content });
      }
      )
        .catch((error) => console.log(error));
    }
  };



  return (
    <div className='result'>
      <div className='container'>
        <div className='nav'>
          <h2 className='center'>Input</h2>
          <ImportExport operationId='import' label={'Input'} importData={handeInput} />
        </div>
        <div className='input-output'>
          <textarea
            onChange={handleChange}
            className='full-size-textarea'
            value={data?.input || ''}
          ></textarea>
        </div>
      </div>

      <div className='container'>
        <div className='nav'>
          <h2>Output</h2>
          <ImportExport operationId='export' label={'Input'} operation={exportData} />
        </div>
        <div className='input-output output'>
          {data?.output || ''}
        </div>
      </div>
    </div>
  );
};

export default Result;