import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GrAddCircle, GrFormNext } from 'react-icons/gr';
import { MdModeEditOutline } from 'react-icons/md';
import toast from 'react-hot-toast';
import NestedView from './NestedView';
import IconBtn from '../../../../common/IconBtn';
import {
  SectionProps,
  setCourse,
  setEditCourse,
  setStep,
} from '../../../../../utils/slices/courseSlice';
import {
  createSection,
  updateSection,
} from '../../../../../services/operations/courseDetailsAPI';
import useCourse from '../../../../../hooks/useCourse';
import useAuth from '../../../../../hooks/useAuth';

const CourseBuilderForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SectionProps>();

  const [editSectionName, setEditSectionName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { course } = useCourse();
  const { token } = useAuth();

  const dispatch = useDispatch();

  const handleCancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName', '');
  };

  const handleGoBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const handleGoNext = () => {
    if (course && course.courseContent.length === 0) {
      toast.error('Please add atleast one Section for the course');
      return;
    }
    if (
      course &&
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error('Please add atleast one lecture in each section');
      return;
    }

    //if everything is good
    dispatch(setStep(3));
  };

  const onFormSubmit = async (data: SectionProps) => {
    setLoading(true);
    let result;

    if (editSectionName && course) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token,
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?._id,
        },
        token,
      );
    }

    //update values in course
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue('sectionName', '');
    }

    setLoading(false);
  };

  const handleChangeEditSectionName = (
    sectionId: string,
    sectionName: string,
  ) => {
    if (editSectionName === sectionId) {
      handleCancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue('sectionName', sectionName);
  };

  return (
    <div className="relative rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 w-full">
      <p className="text-richblack-5">Add your Sections and Lectures</p>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Course Section */}
        <div className="flex flex-col gap-y-1 mb-6">
          <label
            htmlFor="courseSection"
            className="lable-style text-sm text-richblack-200 mt-1"
          >
            Course Section<sup className="text-red-300 text-md ml-0.5">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Enter Course Section"
            {...register('sectionName', { required: true })}
            className={`w-full border ${
              errors.sectionName ? 'border-red-500' : 'border-richblack-700'
            } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 `}
          />
          {errors.sectionName &&
            typeof errors.sectionName.message === 'string' && (
              <p className="text-red-300 text-sm">
                {(errors.sectionName?.message as string) ||
                  `Course title is required`}
              </p>
            )}
        </div>

        {/* Button */}
        <div>
          <IconBtn
            type="submit"
            text={editSectionName ? 'Edit Section Name' : 'Create Section'}
            outline={editSectionName ? false : true}
            customClasses={`${!editSectionName ? 'text-yellow-50' : 'text-richblack-800'}`}
          >
            {!editSectionName ? (
              <GrAddCircle size={22} />
            ) : (
              <MdModeEditOutline size={22} />
            )}
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-sm text-richblack-300 underline ml-10"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course && course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={handleGoBack}
          className="rounded-lg cursor-pointer flex items-center bg-richblack-600 text-richblack-5 py-2 px-6"
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={handleGoNext}>
          <GrFormNext size={22} />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
