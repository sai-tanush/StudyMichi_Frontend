import { FaArrowRight } from 'react-icons/fa';
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from '../../HighlightText';
import CTAButton from '../../Button';

const InstructorSection: React.FC = () => {
  return (
    <div className="flex flex-row justify-between gap-10">
      <div className="w-[80%]">
        <img
          src={Instructor}
          alt="Instructor"
          className="object-contain shadow-xl shadow-blue-200"
        />
      </div>
      <div className="w-[55%] flex flex-col justify-center items-start">
        <div className="text-4xl font-bold">
          Become an<br></br>
          <HighlightText text="Instructor" />
        </div>
        <div className="font-medium text-base text-richblack-400 mt-4">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </div>
        <div className="mt-14">
          <CTAButton active={true} linkto={'/signup'}>
            <div className="flex items-center gap-2">
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
