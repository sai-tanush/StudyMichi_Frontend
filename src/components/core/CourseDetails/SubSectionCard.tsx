import { SubSectionProps } from '../../../utils/slices/courseSlice';

interface SubSectionCardProps {
  subsection: SubSectionProps;
}
const SubSectionCard: React.FC<SubSectionCardProps> = () => {
  return (
    <div className="bg-richblack-800 lg:h-16 flex justify-between mb-2"></div>
  );
};

export default SubSectionCard;
