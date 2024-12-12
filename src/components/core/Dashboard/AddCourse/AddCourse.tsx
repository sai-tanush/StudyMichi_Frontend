import { codeUploadTips } from '../../../../data/code-upload-tips';
import AddCourseStepForm from './AddCourseStepForm';

const AddCourse: React.FC = () => {
  return (
    <div className="w-screen min-h-screen text-white flex justify-around items-start">
      <div className="flex flex-col">
        <h1>Add Course</h1>
        <div>
          <AddCourseStepForm />
        </div>
      </div>
      <div className="mr-36">
        <p>Code Upload Tips</p>
        <ul>
          {codeUploadTips.map((tip) => {
            return <li key={tip.id}>{tip.content}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
