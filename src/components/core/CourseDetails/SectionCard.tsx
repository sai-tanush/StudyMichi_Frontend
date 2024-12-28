import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SectionProps } from '../../../utils/slices/courseSlice';
import SubSectionCard from './SubSectionCard';

interface SectionCardProps {
  section?: SectionProps;
}

const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  const [subLectures, setSubLectures] = useState<boolean>(false);
  const [totalSubSections, setTotalSubSections] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const calculateSubSections = (section: SectionProps | undefined) => {
    let lectures = 0;
    let timeDuration = 0;
    section?.subSection?.forEach((subSection) => {
      lectures += 1;
      timeDuration += parseInt(subSection?.timeDuration);
    });
    setTotalSubSections(lectures);
    timeDuration = Math.floor(timeDuration / 60);
    setTotalDuration(timeDuration);
  };

  useEffect(() => {
    calculateSubSections(section);
  }, [section]);

  return (
    <div>
      <div
        className="bg-richblack-700 lg:h-16 flex justify-between mb-2"
        onClick={() => setSubLectures((val) => !val)}
      >
        <div className="flex items-center gap-x-3 ml-10">
          <div className="text-richblack-200">
            {!subLectures ? (
              <FaChevronDown size={16} />
            ) : (
              <FaChevronUp size={16} />
            )}
          </div>
          <div className="text-richblack-5">{section?.sectionName}</div>
        </div>

        <div className="flex items-center gap-x-3 mr-10">
          <div className="text-yellow-100">{totalSubSections} Lectures</div>
          <div className="text-richblack-100">{totalDuration} mins</div>
        </div>
      </div>
      <div>
        {subLectures &&
          section?.subSection?.map((subsection, index) => (
            <SubSectionCard key={index} subsection={subsection} />
          ))}
      </div>
    </div>
  );
};

export default SectionCard;
