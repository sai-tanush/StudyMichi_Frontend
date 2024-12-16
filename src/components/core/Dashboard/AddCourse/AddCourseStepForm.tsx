import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import { STEP_FORM_STEPS } from '../../../../data/addCourse-StepForm-data';
import { FaCheck } from 'react-icons/fa';
import CourseInformationForm from '../AddCourse/CourseInformationForm/CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm';
import PublishCourse from './PublishCourse/PublishCourse';

const AddCourseStepForm: React.FC = () => {
  const { step } = useSelector((state: RootState) => state.course);
  console.log('Step now in AddCourseStepForm = ', step);
  return (
    <>
      <div className="relative flex justify-around items-center mt-5 mb-[5%] ml-[25%]">
        {STEP_FORM_STEPS.map((item) => (
          <div key={item.id} className="w-1/3 flex items-center">
            <div className="flex flex-col gap-y-1">
              <button
                className={`grid cursor-default mr-2 aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? 'border-yellow-50 bg-yellow-900 text-yellow-50'
                    : 'border-richblack-700 bg-richblack-800 text-richblack-300'
                } ${step > item.id && 'bg-yellow-50 text-yellow-50'}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              {/* course title below step button */}
              <p
                className={`text-sm w-[150px] -ml-7 ${
                  step >= item.id ? 'text-richblack-5' : 'text-richblack-500'
                }`}
              >
                {item.title}
              </p>
            </div>
            {/* dashed line between step labels */}
            {item.id !== STEP_FORM_STEPS.length && (
              <div
                className={`h-[3px] w-[80%] -ml-20 -mt-5 border-dashed border-b-2 ${
                  step > item.id ? 'border-yellow-50' : 'border-richblack-500'
                } `}
              ></div>
            )}
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
