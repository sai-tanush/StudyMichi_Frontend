/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import useUserDetails from '../../../hooks/useUserDetails';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import ReactStars from 'react-rating-stars-component';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { useParams } from 'react-router-dom';

interface CourseReviewModalProps {
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CourseReviewDataPRops {
  courseRating: number;
  courseExperience: string;
}

const CourseReviewModal: React.FC<CourseReviewModalProps> = ({
  setReviewModal,
}) => {
  const { user } = useUserDetails();
  const { token } = useAuth();
  const { courseId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseReviewDataPRops>();

  const ratingChanged = (newRating: number) => {
    setValue('courseRating', newRating);
  };

  const handleFormSubmit = async (data: CourseReviewDataPRops) => {
    await createRating(
      {
        data: {
          courseId: courseId,
          rating: data.courseRating,
          review: data.courseExperience,
        },
      },
      token,
    );
    setReviewModal(false);
  };

  useEffect(() => {
    setValue('courseExperience', '');
    setValue('courseRating', 0);
  }, []);

  return (
    <div className="text-richblack-5 lg:w-[40%] border border-richblack-500 rounded-lg mx-auto">
      <div>
        {/* Modal header */}
        <div className="w-full bg-richblack-700 flex justify-between items-center lg:min-h-16 px-5">
          <p className="text-2xl font-semibold">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <IoClose size={28} />
          </button>
        </div>

        {/* Modal Body */}
        <div>
          <div className="flex justify-center items-center mt-5">
            <img
              src={user?.image}
              alt="user Image"
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className=" ml-5">
              <p className="text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-richblack-100">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="mt-6 flex flex-col items-center w-full"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              activeColor="#ffd700"
            />

            <div className="w-full px-10">
              <label
                htmlFor="courseExperience"
                className="text-richblack-25 text-lg text-left"
              >
                Add your experience
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add your experience"
                {...register('courseExperience', { required: true })}
                className="form-style min-h-[130px] w-full  bg-richblack-800 p-3 rounded-lg text-richblack-100"
              />
              {errors.courseExperience &&
                typeof errors.courseExperience.message === 'string' && (
                  <p className="text-red-300 text-sm">
                    {(errors.courseExperience?.message as string) ||
                      `Course title is required`}
                  </p>
                )}
            </div>

            {/* Buttons */}
            <div className="w-full flex items-center justify-end gap-x-3 px-10 py-5">
              <button onClick={() => setReviewModal(false)}>Cancel</button>
              <IconBtn text="save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
