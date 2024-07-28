import ImportExport from '../ImportExport';

const Result = () => {

  const handleImport = () => {
    console.log('Import');
  };

  const handleExport = () => {
    console.log('Export');
  }



  return (
    <div className='result'>

      <div className='container'>

        <div className='nav'>
          <h2>Input:</h2>
          <ImportExport operationId='import' label={'Input'} operation={handleImport} />
        </div>

        <div className='input-output'>
          <textarea className='full-size-textarea'></textarea>
        </div>
      </div>

      <div className='container'>
        <div className='nav'>
          <h2>Output:</h2>
          <ImportExport operationId='export' label={'Input'} operation={handleExport} />
        </div>
        <div className='input-output'></div>
      </div>


    </div>
  );
};

export default Result;