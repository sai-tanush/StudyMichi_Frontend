import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import { STEP_FORM_STEPS } from '../../../../data/addCourse-StepForm-data';
import { FaCheck } from 'react-icons/fa';
import CourseInformationForm from '../AddCourse/CourseInformationForm/CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm';
import PublishCourse from './PublishCourse';

const AddCourseStepForm: React.FC = () => {
  const { step } = useSelector((state: RootState) => state.course);
  console.log('Step now = ', step);
  return (
    <>
      <div className="flex gap-x-20">
        {STEP_FORM_STEPS.map((item) => (
          <div key={item.id}>
            <div>
              <div
                className={`${
                  step === item.id
                    ? 'bg-yellow-900 border-yellow-50 text-yellow-50'
                    : 'bg-richblack-800 border-richblack-700 text-richblack-300'
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
            </div>
            {/* Add code for dashed line between step labels */}
          </div>
        ))}
      </div>
      <div className="flex gap-x-5">
        {STEP_FORM_STEPS.map((item) => (
          <div key={item.id}>
            <div>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default AddCourseStepForm;
