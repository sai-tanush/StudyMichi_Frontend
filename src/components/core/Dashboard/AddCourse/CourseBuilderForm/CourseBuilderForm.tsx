import { useForm } from 'react-hook-form';

const CourseBuilderForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  return (
    <div className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 w-full">
      <p>Course Builder</p>

      <form>
        {/* Course Section */}
        <div className="flex flex-col gap-y-1 mb-6">
          <label
            htmlFor="courseSection"
            className="lable-style text-sm text-richblack-200 mt-1"
          >
            Course Section<sup className="text-red-300 text-md ml-0.5">*</sup>
          </label>
          <input
            id="courseSection"
            placeholder="Enter Course Section"
            {...register('courseSection', { required: true })}
            className={`w-full border ${
              errors.courseSection ? 'border-red-500' : 'border-richblack-700'
            } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 `}
          />
          {errors.courseSection &&
            typeof errors.courseSection.message === 'string' && (
              <p className="text-red-300 text-sm">
                {(errors.courseSection?.message as string) ||
                  `Course title is required`}
              </p>
            )}
        </div>
      </form>
    </div>
  );
};

export default CourseBuilderForm;
