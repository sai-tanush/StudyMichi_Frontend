/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../utils/store/store';
import IconBtn from '../../common/IconBtn';
import { BiChevronDown } from 'react-icons/bi';
import { FaArrowLeftLong } from 'react-icons/fa6';

export interface VideoDetailsSidebarProps {
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoDetailsSidebar: React.FC<VideoDetailsSidebarProps> = ({
  setReviewModal,
}) => {
  const [activeStatus, setActiveStatus] = useState('');
  const [videoBarActive, setVideoBarActive] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state: RootState) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId,
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      //set current section
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

      //set current sub-section
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="lg:min-h-screen w-[20%] border-r border-richblack-25">
      <div>
        {/* for button and headings */}
        <div>
          {/* for buttons */}
          <div className="flex justify-between px-3 py-5">
            <div
              onClick={() => {
                navigate('/dashboard/enrolled-courses');
              }}
              className="text-richblack-5 w-fit px-4 py-2 rounded-lg flex gap-x-2 items-center cursor-pointer hover:underline"
            >
              <FaArrowLeftLong size={16} />
              Back
            </div>

            <div>
              <IconBtn text="Add Review" onclick={() => setReviewModal(true)} />
            </div>
          </div>

          {/* for heading or title */}
          <div className="py-5 flex items-center justify-between px-4">
            <p className="text-richblack-5 text-lg font-semibold ">
              {courseEntireData?.courseName}
            </p>
            <p className="text-richblack-100">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for sections and sub-sections */}
        <div>
          {courseSectionData.map((section, index) => (
            <div
              className="px-2"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
              {/* sections */}
              <div className="bg-richblack-700  text-richblack-5 p-4 flex items-center justify-between">
                <div>{section?.sectionName}</div>
                <BiChevronDown />
              </div>

              {/* sub-sections */}
              <div>
                {activeStatus === section?._id && (
                  <div>
                    {section?.subSection.map((topic, index) => (
                      <div
                        className={`flex gap-5 p-4 ${
                          videoBarActive === topic?._id
                            ? 'bg-yellow-100 text-richblack-900'
                            : 'bg-richblack-900 text-richblack-5'
                        }`}
                        key={index}
                        onClick={() => {
                          navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/
                                      sub-section/${topic?._id}`);
                          setVideoBarActive(topic?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        <div className="flex justify-between gap-x-10">
                          <span>{topic.title}</span>
                          <p className="text-blue-100 text-sm lg:ml-5">
                            {parseInt(topic?.timeDuration / 60)} mins
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
