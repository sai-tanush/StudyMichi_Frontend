import { useForm } from 'react-hook-form';
import { RootState } from '../../../../../utils/store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import IconBtn from '../../../../common/IconBtn';
import {
  resetCourseState,
  setStep,
} from '../../../../../utils/slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourse: React.FC = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course } = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue('public', true);
    }
  }, []);

  const handleGoBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    // navigate("/dashboard/my-courses");
  };

  const onFormSubmit = () => {
    handleCoursePublish();
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues('public') === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues('public') === false)
    ) {
      //there is no updation in form
      //no need to make api call
      goToCourses();
      return;
    }

    //If form is updated
    const formData = new FormData();
    formData.append('courseId', course?._id);

    const courseStatus = getValues('public')
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append('status', courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }

    setLoading(false);
  };

  return (
    <div className="rounded-lg border-[1px] border-richblack-700 bg-richblack-800">
      <p className="lable-style text-richblack-5 text-2xl font-semibold mt-1 p-5">
        Publish Course
      </p>
      <form onSubmit={handleSubmit(onFormSubmit)} className="p-5">
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              {...register('public')}
              className="rounded h-4 w-4 "
            />
            <span className="ml-3 text-lg text-richblack-100">
              Make this course as public
            </span>
          </label>
        </div>
        <div className="w-full flex gap-x-3 my-5 justify-end">
          <button
            disabled={loading}
            type="button"
            onClick={handleGoBack}
            className="rounded-md bg-richblack-600 py-2 px-8"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save changes" />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
