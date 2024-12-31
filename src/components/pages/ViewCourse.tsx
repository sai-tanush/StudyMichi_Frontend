import { useEffect, useState } from 'react';
import VideoDetailsSidebar from '../core/ViewCourse/VideoDetailsSidebar';
import { Outlet, useParams } from 'react-router-dom';
import CourseReviewModal from '../core/ViewCourse/CourseReviewModal';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getFullDetailsOfCourse } from '../../services/operations/courseDetailsAPI';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from '../../utils/slices/viewCourseSlice';

const ViewCourse: React.FC = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useAuth();
  const dispatch = useDispatch();

  const setCourseSpecificDetails = async () => {
    const courseData = await getFullDetailsOfCourse(courseId, token);
    dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
    dispatch(setEntireCourseData(courseData?.courseDetails));
    dispatch(setCompletedLectures(courseData?.completedVideos));
    let lectures = 0;
    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length;
    });
    dispatch(setTotalNoOfLectures(lectures));
  };

  useEffect(() => {
    setCourseSpecificDetails();
  }, []);

  return (
    <div>
      <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div>
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
