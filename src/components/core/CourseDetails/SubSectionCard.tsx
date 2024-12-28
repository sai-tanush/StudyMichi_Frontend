import { useEffect, useState } from 'react';
import { SubSectionProps } from '../../../utils/slices/courseSlice';
import { MdVideoLibrary } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SubSectionCardProps {
  subsection: SubSectionProps;
}
const SubSectionCard: React.FC<SubSectionCardProps> = ({ subsection }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [timeDuration, setTimeDuration] = useState<number>(0);

  const lectureTimeDuration = subsection?.timeDuration;

  const convertIntoMin = (lectureTimeDuration: string) => {
    let subSectionTimeDuration = 0;
    subSectionTimeDuration = Math.floor(parseInt(lectureTimeDuration) / 60);
    setTimeDuration(subSectionTimeDuration);
  };

  useEffect(() => {
    convertIntoMin(lectureTimeDuration);
  }, [subsection]);

  console.log('subSection in SubSectionCard = ', subsection);

  return (
    <div className="bg-richblack-800 lg:h-16 flex justify-between mb-2">
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-x-3 ml-10"
          onClick={() => setShowDescription((val) => !val)}
        >
          <div className="text-richblack-300">
            <MdVideoLibrary size={34} />
          </div>
          <p className="text-richblack-100">{subsection?.title}</p>
          <div className="text-richblack-100">
            {!showDescription ? (
              <FaChevronDown size={12} />
            ) : (
              <FaChevronUp size={12} />
            )}
          </div>
        </div>
        <div className="mr-10 text-richblack-100">{timeDuration} mins</div>
      </div>
    </div>
  );
};

export default SubSectionCard;
