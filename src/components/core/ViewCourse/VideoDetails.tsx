/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/store/store';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../utils/slices/viewCourseSlice';
import Spinner from '../../common/Spinner';
import IconBtn from '../../common/IconBtn';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface VideoDataProps {
  description: string;
  timeDuration: string;
  title: string;
  videoUrl: string;
  __v: number;
  _id: string;
}

const VideoDetails: React.FC = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useAuth();
  const playerRef = useRef<Player>();
  const location = useLocation();
  const { courseEntireData, courseSectionData, completedLectures } =
    useSelector((state: RootState) => state.viewCourse);

  const [videoData, setVideoData] = useState<VideoDataProps[]>([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate('/dashboard/enrolled-courses');
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId,
        );

        console.log('courseId = ', courseId);
        console.log('sectionId = ', sectionId);
        console.log('subSectionId = ', subSectionId);
        console.log('courseSectionData = ', courseSectionData);

        console.log(
          'filteredData in setVideoSpecificDaetails = ',
          filteredData,
        );

        const filteredVideoData = filteredData[0]?.subSection.filter(
          (data) => data._id === subSectionId,
        );

        console.log(
          'filteredVideoData in setVideoSpecificDaetails = ',
          filteredVideoData,
        );

        setVideoData(filteredVideoData);
        setVideoEnded(false);
      }
    };

    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    console.log('isFirstVideo is called');
    console.log('courseSectionData = ', courseSectionData);

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    console.log('CurrentSectionIndex = ', currentSectionIndex);
    console.log(
      'courseData of CurrentIndex in isFirstVideo = ',
      courseSectionData[currentSectionIndex],
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    // Find the current section index
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    // Check if section is found
    if (currentSectionIndex === -1) {
      console.error(`Section with id ${sectionId} not found`);
      return false;
    }

    const currentSection = courseSectionData[currentSectionIndex];

    // Get the number of subsections
    const noOfSubSections = currentSection?.subSection?.length || 0;

    // Find the current subsection index
    const currentSubSectionIndex = currentSection.subSection.findIndex(
      (data) => data._id === subSectionId,
    );

    // Check if subsection is found
    if (currentSubSectionIndex === -1) {
      console.error(`Subsection with id ${subSectionId} not found`);
      return false;
    }

    // Check if it's the last video
    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    }

    return false;
  };

  const goToNextVideo = () => {
    console.log('GoToNextVideo called');
    if (isLastVideo()) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection?.length || 0;

    if (currentSubSectionIndex < noOfSubSections - 1) {
      // Navigate to the next video within the same section
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`,
      );
    } else if (currentSectionIndex < courseSectionData.length - 1) {
      // Navigate to the first video of the next section
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`,
      );
    }
  };

  const goToPreviousVideo = () => {
    if (isFirstVideo()) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex != 0) {
      //same section previous video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;

      //go to url
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`,
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      //go to url
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`,
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subSectionId: subSectionId,
      },
      token,
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  const handleRewatchVideo = () => {
    console.log('Clicked Rewatch');
    if (playerRef?.current) {
      playerRef.current?.seek(0);
      setVideoEnded(false);
    }
  };

  console.log('videoData = ', videoData);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  console.log('courseSectionData = ', courseSectionData);
  console.log('courseEntireData = ', courseEntireData);
  console.log('completedLectures  =', completedLectures);

  return (
    <div className="pr-5 border border-pink-200">
      {!videoData ? (
        <div className="text-richblack-5 flex items-center justify-center font-semibold text-3xl">
          No Video found!
        </div>
      ) : (
        <div className="lg:min-h-screen">
          <Player
            playsInline
            ref={playerRef}
            src={videoData[0]?.videoUrl}
            onEnded={() => setVideoEnded(true)}
          >
            {videoEnded && (
              <div
                className={`absolute inset-0 h-[90%] flex flex-col items-center justify-center bg-opacity-0 
                    ${videoEnded ? 'bg-opacity-50 h-[100%]' : 'bg-opacity-0 h-[80%]'} transition-all bg-black z-10 
                    `}
              >
                {videoEnded && (
                  <div className="flex flex-col gap-y-5">
                    <div className="flex items-center justify-center gap-x-5">
                      {!completedLectures.includes(subSectionId) && (
                        <IconBtn
                          disabled={loading}
                          onclick={() => handleLectureCompletion()}
                          text={!loading ? 'Mark as completed' : 'Loading...'}
                          customClasses="py-2 text-lg"
                        />
                      )}
                      <IconBtn
                        disabled={loading}
                        onclick={handleRewatchVideo}
                        text="Rewatch"
                        customClasses="text-xl"
                      />
                    </div>

                    <div className="flex justify-between gap-x-5">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPreviousVideo}
                          className="bg-richblack-700 text-richblack-5 text-lg flex gap-x-3 font-semibold rounded-lg px-4 py-2"
                        >
                          <FaArrowLeft size={22} />
                          Prev
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="bg-richblack-700 text-richblack-5 flex gap-x-3 text-lg font-semibold rounded-lg px-4 py-2"
                        >
                          Next
                          <FaArrowRight size={22} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Player>
        </div>
      )}

      <h1 className="text-richblack-5 text-xl">{videoData?.title}</h1>
      <p className="text-richblack-100 text-lg">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
