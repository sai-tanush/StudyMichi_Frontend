import { FaArrowRight } from 'react-icons/fa';
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from '../../common/Button';

const InstructorSection: React.FC = () => {
  return (
    <div className="flex flex-row justify-between gap-10">
      <div className="w-[80%] hidden lg:block">
        <img
          src={Instructor}
          alt="Instructor"
          className="object-contain shadow-xl shadow-blue-200 "
        />
      </div>
      <div className="w-[90%] lg:w-[55%] flex flex-col justify-center items-start mx-auto -mt-16">
        <div className="w-[90%] text-2xl text-center lg:text-4xl font-bold">
          Become an<br></br>
          <HighlightText text="Instructor" />
        </div>
        <div className="font-medium text-base text-richblack-400 mt-4">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </div>
        <div className="mt-10 lg:mt-14 w-[90%] lg:w-auto">
          <CTAButton active={true} linkto={'/signup'}>
            <div className="flex items-center gap-2 mx-auto">
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
