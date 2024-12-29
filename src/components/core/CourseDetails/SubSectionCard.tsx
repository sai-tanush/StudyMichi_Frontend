/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { SubSectionProps } from '../../../utils/slices/courseSlice';
import { MdVideoLibrary } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SubSectionCardProps {
  subsection: SubSectionProps;
  collapseSections: boolean;
  setCollapseSections: React.Dispatch<React.SetStateAction<boolean>>;
}
const SubSectionCard: React.FC<SubSectionCardProps> = ({
  subsection,
  collapseSections,
  setCollapseSections,
}) => {
  const [timeDuration, setTimeDuration] = useState<number>(0);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const lectureTimeDuration = subsection?.timeDuration;

  const convertIntoMin = (lectureTimeDuration: string) => {
    let subSectionTimeDuration = 0;
    subSectionTimeDuration = Math.floor(parseInt(lectureTimeDuration) / 60);
    setTimeDuration(subSectionTimeDuration);
  };

  const handleShowDescription = () => {
    setCollapseSections(false);
    setShowDescription((val) => !val);
  };

  useEffect(() => {
    convertIntoMin(lectureTimeDuration);
  }, [subsection]);

  console.log('subSection in SubSectionCard = ', subsection);

  return (
    <>
      {!collapseSections && (
        <div className="bg-richblack-800 lg:min-h-16 flex flex-col justify-between mb-2">
          <div className="w-full flex justify-between items-center pt-4">
            <div
              className="flex justify-center items-center gap-x-3 ml-10"
              onClick={handleShowDescription}
            >
              <div className="text-richblack-300">
                <MdVideoLibrary size={34} />
              </div>
              <p className="text-richblack-5">{subsection?.title}</p>
              <div className="text-richblack-100">
                {!showDescription && !collapseSections ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronUp size={12} />
                )}
              </div>
            </div>
            <div className="mr-10 text-richblack-100">{timeDuration} mins</div>
          </div>
          {showDescription && (
            <p className="text-richblack-100 ml-20 my-4">
              {subsection?.description}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default SubSectionCard;
