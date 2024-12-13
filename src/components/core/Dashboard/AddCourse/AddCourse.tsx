import { codeUploadTips } from '../../../../data/code-upload-tips';
import AddCourseStepForm from './AddCourseStepForm';

const AddCourse: React.FC = () => {
  return (
    <div className="w-screen min-h-screen text-white flex gap-x-10 items-start">
      <div className="flex flex-col w-[50%] mx-5">
        <h1 className="text-4xl font-semibold text-richblack-5">Add Course</h1>
        <div>
          <AddCourseStepForm />
        </div>
      </div>
      <div className="w-1/5 p-6 bg-richblack-800 rounded-lg">
        <p className="text-richblack-5 font-semibold">⚡ Code Upload Tips</p>
        <ul className="list-disc pl-4">
          {codeUploadTips.map((tip) => {
            return (
              <li key={tip.id} className="text-xs my-3 font-medium">
                {tip.content}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
