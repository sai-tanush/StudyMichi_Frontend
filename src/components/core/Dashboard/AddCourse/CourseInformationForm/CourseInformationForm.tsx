import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import { useEffect, useState } from 'react';
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from '../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import TagInput from './TagInput';
import ThumbnailUpload from './ThumbnailUpload';
import CourseRequirementField from './CourseRequirementField';
import { setCourse, setStep } from '../../../../utils/slices/courseSlice';
import IconBtn from '../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../utils/constants';

const CourseInformationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
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

  useEffect(() => {
    if (editCourse) {
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
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tags.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onFormSubmit = async (data) => {
    console.log('Current courseTags: ', getValues('courseTags'));
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

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

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append('category', data.courseCategory);
        }

        if (currentValues.courseTags.toString() !== course.tags.toString()) {
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
    const formData = new FormData();
    formData.append('courseName', data.courseTitle);
    formData.append('courseDescription', data.courseShortDesc);
    formData.append('price', data.coursePrice);
    formData.append('whatYouWillLearn', data.courseBenefits);
    formData.append('category', data.courseCategory);
    formData.append('tags', JSON.stringify(data.courseTags));
    formData.append('thumbnailImage', data.courseImage);
    formData.append('instructions', JSON.stringify(data.courseRequirements));
    formData.append('status', COURSE_STATUS.DRAFT);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      setStep(2);
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
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div>
          {/* Course Title */}
          <div>
            <label htmlFor="courseTitle">
              Course Title<sup>*</sup>
            </label>
            <input
              id="courseTitle"
              placeholder="Enter Course Title"
              {...register('courseTitle', { required: true })}
              className="w-full"
            />
            {errors.courseTitle &&
              typeof errors.courseTitle.message === 'string' && (
                <span>{errors.courseTitle.message}</span>
              )}
          </div>

          {/* Course Short Description */}
          <div>
            <label htmlFor="courseShortDesc">
              Course Short Description<sup>*</sup>
            </label>
            <textarea
              id="courseShortDesc"
              placeholder="Enter Course Description"
              {...register('courseShortDesc', { required: true })}
              className="w-full min-h-[140px]"
            />
            {errors.courseTitle &&
              typeof errors.courseTitle.message === 'string' && (
                <span>{errors.courseTitle.message}</span>
              )}
          </div>

          {/* Course Price */}
          <div className="relative">
            <label htmlFor="coursePrice">
              Course Price<sup>*</sup>
            </label>
            <input
              id="coursePrice"
              placeholder="Enter Course Price"
              {...register('coursePrice', { required: true })}
              className="w-full"
            />
            <HiOutlineCurrencyRupee
              size={26}
              className="absolute top-1/2 text-richblack-400"
            />
            {errors.coursePrice &&
              typeof errors.coursePrice.message === 'string' && (
                <span>{errors.coursePrice.message}</span>
              )}
          </div>

          {/* Course Category */}
          <div>
            <label htmlFor="courseCategory">
              Course Category<sup>*</sup>
            </label>
            <select
              id="courseCategory"
              defaultValue=""
              {...register('courseCategory', { required: true })}
              className="w-full"
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
                <span>{errors.courseCategory.message}</span>
              )}
          </div>

          {/* Course Tags */}
          <div>
            <TagInput
              label="Tags"
              name="courseTags"
              placeholder="Enter tags and press Enter"
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
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
            />
          </div>

          {/* Course Benefits */}
          <div>
            <label htmlFor="courseBenefits">
              Benefits of the Course<sup>*</sup>
            </label>
            <textarea
              id="courseBenefits"
              placeholder="Enter benefits of the Course"
              {...register('courseBenefits', { required: true })}
              className="w-full min-h-[140px]"
            />
            {errors.courseBenefits &&
              typeof errors.courseBenefits.message === 'string' && (
                <span>{errors.courseBenefits.message}</span>
              )}
          </div>

          {/* Course Requirement Field */}
          <div>
            <CourseRequirementField
              name="courseRequirements"
              label="Requirements/ Instructions"
              placeholder="Enter the requirements/ instructions for the course"
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
            />
          </div>
        </div>

        <div>
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="flex items-center gap-x-2 bg-richblack-300 text-richblack-800"
            >
              Continue without saving
            </button>
          )}

          <IconBtn text={!editCourse ? 'Next' : 'Save Changes'} />
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
