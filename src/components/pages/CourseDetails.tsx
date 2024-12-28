import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../../services/operations/courseDetailsAPI';
import Spinner from '../common/Spinner';
import RatingStars from '../common/RatingStars';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { CiGlobe } from 'react-icons/ci';
import BuyCourseCard from '../core/Catalog/BuyCourseCard';
import { CourseProps } from '../../utils/slices/courseSlice';
import GetAvgRating from '../../utils/helperFunctions/avgRating';
import Error from './Error';
import ConfirmationModal, { ModalDataProps } from '../common/ConfirmationModal';
import { formatDate } from '../../utils/helperFunctions/formatDate';
import SectionCard from '../core/CourseDetails/SectionCard';

const CourseDetails: React.FC = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [courseData, setCourseData] = useState<CourseProps | null>(null);
  const [avgReviewCount, setAvgReviewCount] = useState<number>(0);
  const [totalLectures, setTotalLectures] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<string>('');
  const [confirmationModal, setConfirmationModal] =
    useState<ModalDataProps | null>(null);
  const [collapseSections, setCollapseSections] = useState<boolean>(false);

  console.log('courseId in CourseDetails = ', courseId);

  const getCourseDetails = async () => {
    setLoading(true);
    const result = await fetchCourseDetails(courseId);
    console.log('result in getCourseDetails = ', result);
    console.log('courseDetails = ', result.data.courseDetails[0]);
    setCourseData(result.data.courseDetails);
    setTotalDuration(result?.data?.totalDuration);
    setLoading(false);
  };

  const handleCollapseSection = () => {
    console.log('handleCollapseSection is called');
    setCollapseSections(true);
  };

  useEffect(() => {
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(courseData?.ratingAndReview);
    setAvgReviewCount(count);
  }, [courseData]);

  useEffect(() => {
    let lectures = 0;
    courseData?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalLectures(lectures);
  }, [courseData]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Error />
      </div>
    );
  }

  return (
    <div className="flex w-3/4 min-h-screen mx-auto gap-x-2 ">
      {/* About Course  */}
      <div className="flex flex-col  lg:w-[60%]">
        {/* Course Header */}
        <div className="flex flex-col gap-y-2 p-4 lg:mt-[10%]">
          <p className="text-4xl text-richblack-5 font-semibold">
            {courseData?.courseName}
          </p>
          <p className="text-lg text-richblack-300">
            {courseData?.courseDescription}
          </p>

          <div className="flex gap-x-2">
            <span className="text-richblack-100">{avgReviewCount}</span>
            <RatingStars Review_Count={4} />
            <span className="text-richblack-100">{`(${courseData?.ratingAndReview.length} reviews)`}</span>
            <span className="text-richblack-100">{`(${courseData?.studentEnrolled.length} students enrolled)`}</span>
          </div>

          <div>
            <p className="text-richblack-100">
              Created by -
              <span className="text-richblue-100">{` ${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}</span>
            </p>
          </div>

          <div className="flex gap-x-4">
            <div className="flex items-center gap-x-2 text-md text-richblack-100">
              <IoInformationCircleOutline size={22} />
              <p>Created at {formatDate(courseData.createdAt)}</p>
            </div>

            <div className="flex items-center gap-x-2 text-md text-richblack-100">
              <CiGlobe size={22} />
              <p>English</p>
            </div>
          </div>
        </div>

        {/* Course Body */}
        <div className="flex flex-col gap-y-4 p-5">
          <div className="lg:h-[150px] flex flex-col justify-center gap-y-5 px-10 border border-richblack-600">
            <p className="text-3xl text-richblack-50 font-semibold">
              What you'll learn
            </p>
            <p className="text-lg text-richblack-50 ">
              {courseData?.whatYouWillLearn}
            </p>
          </div>

          <div className="flex flex-col gap-y-4 p-2 ">
            <p className="text-3xl text-richblack-50 font-semibold">
              Course Content:
            </p>
            <div className="flex gap-x-3 justify-between">
              <div className="flex gap-x-3">
                <span className="text-richblack-50 text-lg">
                  {courseData?.courseContent.length} section(s)
                </span>
                <span className="text-richblack-50 text-lg">
                  {totalLectures} lectures
                </span>
                <span className="text-richblack-50 text-lg">
                  <span className="text-brown-200">{totalDuration}</span>{' '}
                  duration
                </span>
              </div>
              <div>
                <button
                  onClick={handleCollapseSection}
                  className="text-yellow-50 text-lg cursor-pointer"
                >
                  Collapse all Sections
                </button>
              </div>
            </div>
            <div>
              {courseData?.courseContent?.map((section, index) => (
                <SectionCard
                  key={index}
                  section={section}
                  collapseSections={collapseSections}
                  setCollapseSections={setCollapseSections}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buy Course */}
      <div className="flex flex-col ">
        <BuyCourseCard
          setConfirmationModal={setConfirmationModal}
          courseData={courseData}
        />
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;
