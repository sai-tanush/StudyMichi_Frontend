import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import TagInput from './TagInput';
import ThumbnailUpload from './ThumbnailUpload';
import CourseRequirementField from './CourseRequirementField';
import { setCourse, setStep } from '../../../../../utils/slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { RootState } from '../../../../../utils/store/store';
import { MdNavigateNext } from 'react-icons/md';

const CourseInformationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { course, editCourse } = useSelector(
    (state: RootState) => state.course,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    console.log('All categories = ', categories);
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  // Pre-fill form fields if in edit mode
  useEffect(() => {
    if (editCourse && course) {
      setValue('courseTitle', course.courseName);
      setValue('courseShortDesc', course.courseDescription);
      setValue('coursePrice', course.price);
      setValue('courseTags', course.tag);
      setValue('courseBenefits', course.whatYouWillLearn);
      setValue('courseCategory', course.category);
      setValue('courseRequirements', course.instructions);
      setValue('courseImage', course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      course &&
      (currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.courseRequirements.toString() !==
          course.instructions.toString())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onFormSubmit = async (data: any) => {
    console.log('Current courseTags: ', getValues('courseTags'));
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        if (course) {
          formData.append('courseId', course._id);

          if (currentValues.courseTitle !== course.courseName) {
            formData.append('courseName', data.courseTitle);
          }

          if (currentValues.courseShortDesc !== course.courseDescription) {
            formData.append('courseDescription', data.courseShortDesc);
          }

          if (currentValues.coursePrice !== course.price) {
            formData.append('price', data.coursePrice);
          }

          if (currentValues.courseBenefits !== course.whatYouWillLearn) {
            formData.append('whatYouWillLearn', data.courseBenefits);
          }

          if (currentValues.courseCategory._id !== course?.category._id) {
            formData.append('category', data.courseCategory);
          }

          if (currentValues.courseTags.toString() !== course.tag.toString()) {
            formData.append('tags', JSON.stringify(data.courseTags));
          }

          if (
            currentValues.courseImage.toString() !== course.thumbnail.toString()
          ) {
            formData.append('thumbnail', JSON.stringify(data.courseImage));
          }

          if (
            currentValues.courseRequirements.toString() !==
            course.instructions.toString()
          ) {
            formData.append(
              'instructions',
              JSON.stringify(data.courseRequirements),
            );
          }
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }

        console.log('formData for editing course = ', formData);
        console.log('Printing result for editCourse', result);
      } else {
        toast.error('No changes made to form!');
      }

      return;
    }

    //create a new course
    console.log(
      'Course Tags before appending in form ',
      JSON.stringify(data.courseTags),
    );
    const formData = new FormData();
    formData.append('courseName', data.courseTitle);
    formData.append('courseDescription', data.courseShortDesc);
    formData.append('price', data.coursePrice);
    formData.append('whatYouWillLearn', data.courseBenefits);
    formData.append('category', data.courseCategory);
    formData.append('tag', JSON.stringify(data.courseTags));
    formData.append('thumbnailImage', data.courseImage);
    formData.append('instructions', JSON.stringify(data.courseRequirements));
    formData.append('status', COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);

    console.log('formData for creating new Course = ', formData);
    console.log('Printing result for creating new Course = ', result);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 w-full"
      >
        <div>
          {/* Course Title */}
          <div className="flex flex-col gap-y-1 mb-6">
            <label
              htmlFor="courseTitle"
              className="lable-style text-sm text-richblack-200 mt-1"
            >
              Course Title<sup className="text-red-300 text-md ml-0.5">*</sup>
            </label>
            <input
              id="courseTitle"
              placeholder="Enter Course Title"
              {...register('courseTitle', { required: true })}
              className={`w-full border ${
                errors.courseTitle ? 'border-red-500' : 'border-richblack-700'
              } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 `}
            />
            {errors.courseTitle &&
              typeof errors.courseTitle.message === 'string' && (
                <p className="text-red-300 text-sm">
                  {(errors.courseTitle?.message as string) ||
                    `Course title is required`}
                </p>
              )}
          </div>

          {/* Course Short Description */}
          <div className="flex flex-col gap-y-1 mb-6">
            <label
              htmlFor="courseShortDesc"
              className="lable-style text-sm text-richblack-200 mt-1"
            >
              Course Short Description
              <sup className="text-red-300 text-md ml-0.5">*</sup>
            </label>
            <textarea
              id="courseShortDesc"
              placeholder="Enter Course Description"
              {...register('courseShortDesc', { required: true })}
              className={`w-full border ${
                errors.courseShortDesc
                  ? 'border-red-500'
                  : 'border-richblack-700'
              } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 lg:min-h-[140px]`}
            />
            {errors.courseShortDesc &&
              typeof errors.courseShortDesc.message === 'string' && (
                <p className="text-red-300 text-sm">
                  {(errors.courseShortDesc?.message as string) ||
                    `Course description is required`}
                </p>
              )}
          </div>

          {/* Course Price */}
          <div className="relative flex flex-col gap-y-1 mb-6">
            <label
              htmlFor="coursePrice"
              className="lable-style text-sm text-richblack-200 mt-1"
            >
              Course Price<sup className="text-red-300 text-md ml-0.5">*</sup>
            </label>
            <div className="relative">
              <input
                id="coursePrice"
                placeholder="Enter Course Price"
                {...register('coursePrice', { required: true })}
                className={`w-full border ${
                  errors.coursePrice ? 'border-red-500' : 'border-richblack-700'
                } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 pl-10`} // Added padding-left for space
              />

              <HiOutlineCurrencyRupee
                size={28} // Adjust size as needed
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-richblack-100" // Position the icon
              />
            </div>

            {errors.coursePrice &&
              typeof errors.coursePrice.message === 'string' && (
                <p className="text-red-300 text-sm mt-0.5">
                  {errors.coursePrice?.message || `Course price is required`}
                </p>
              )}
          </div>

          {/* Course Category */}
          <div className="relative flex flex-col gap-y-1 mb-6">
            <label
              htmlFor="courseCategory"
              className="lable-style text-sm text-richblack-200 mt-1"
            >
              Course Category
              <sup className="text-red-300 text-md ml-0.5">*</sup>
            </label>
            <select
              id="courseCategory"
              defaultValue=""
              {...register('courseCategory', { required: true })}
              className={`w-full border ${
                errors.courseCategory
                  ? 'border-red-500'
                  : 'border-richblack-700'
              } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 `}
            >
              <option value="" disabled>
                Choose a Category
              </option>

              {!loading &&
                courseCategories.map((category, index) => (
                  <option key={index} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
            </select>
            {errors.courseCategory &&
              typeof errors.courseCategory.message === 'string' && (
                <p className="text-red-300 text-sm">
                  {(errors.courseBenefits?.message as string) ||
                    `Course category is required`}
                </p>
              )}
          </div>

          {/* Course Tags */}
          <div className="-mt-2">
            <TagInput
              label="Tags"
              name="courseTags"
              placeholder="Enter tags and press Enter"
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>

          {/* Course Thumbnail Upload */}
          <div>
            <ThumbnailUpload
              name="courseImage"
              label="Course Thumbnail"
              register={register}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
              editData={editCourse ? course?.thumbnail : null}
            />
          </div>

          {/* Course Benefits */}
          <div className="relative flex flex-col gap-y-1 mb-6">
            <label
              htmlFor="courseBenefits"
              className="lable-style text-sm text-richblack-200 mt-1"
            >
              Benefits of the Course
              <sup className="text-red-300 text-md ml-0.5">*</sup>
            </label>
            <textarea
              id="courseBenefits"
              placeholder="Enter benefits of the Course"
              {...register('courseBenefits', { required: true })}
              className={`w-full border ${
                errors.courseBenefits
                  ? 'border-red-500'
                  : 'border-richblack-700'
              } form-style rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 lg:min-h-[140px]`}
            />
            {errors.courseBenefits &&
              typeof errors.courseBenefits.message === 'string' && (
                <p className="text-red-300 text-sm">
                  {(errors.courseBenefits?.message as string) ||
                    `Course benefits is required`}
                </p>
              )}
          </div>

          {/* Course Requirement Field */}
          <div className="flex flex-col gap-y-1 mb-6">
            <CourseRequirementField
              name="courseRequirements"
              label="Requirements/ Instructions"
              placeholder="Enter the requirements/ instructions for the course"
              register={register}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          </div>
        </div>

        <div className="text-right flex justify-between ">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="flex items-center gap-x-2 py-2 px-4 rounded-lg bg-richblack-600 text-richblack-5"
            >
              Continue without saving
            </button>
          )}

          <IconBtn
            disabled={loading}
            //onclick={handleSaveNextFormCheck}
            text={!editCourse ? 'Next' : 'Save Changes'}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
