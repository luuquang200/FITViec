
const images ={ jobImage:'https://itviec.com/assets/everything-empty-62c813bcb84be8a092033e40550b6fdc9f6bda05947d60c619b2a74906144f8b.svg' };

const EmployeeJobSave = () => {
    return (
      <div className="bg-gray-200 w-full">
        <div className="mt-10 mr-32 ml-32 flex justify-between">
          <div><p className="text-2xl font-semibold">Save Job</p></div>
          <div>
            <p>Sort by</p>
            <div></div>
          </div>
        </div>

        <div className="bg-white mt-10 mr-32 ml-32">
            <div className="flex flex-col h-72 justify-center">
              <div className="self-center"><img src={images.jobImage} alt="JOB Folder" /></div>
              <div className="self-center"><p className="text-gray-500">You have 0 jobs</p></div>
            </div>
        </div>
        
      </div>
    );
};
  
export default EmployeeJobSave;