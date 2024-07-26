import download from '../../../../assets/download.svg';
import upload from '../../../../assets/upload.svg';

const Result = () => {
  return (
    <div className='result'>

      <div className='container'>

        <div className='nav'>
          <h2>Input:</h2>

          <div className='import-export'>
            <span>
              Import Input
            </span>
            <img src={download} alt="" />
          </div>


        </div>

        <div className='input-output'>
          <textarea className='full-size-textarea'></textarea>
        </div>
      </div>

      <div className='container'>
        <div className='nav'>
          <h2>Output:</h2>
          <div className='import-export'>
            <span>

              Export Input
            </span>
            <img src={upload} alt="" />
          </div>


        </div>
        <div className='input-output'></div>
      </div>


    </div>
  );
};

export default Result;