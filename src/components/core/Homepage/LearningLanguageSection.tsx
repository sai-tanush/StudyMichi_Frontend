import HighlightText from './HighlightText';
import CTAButton from '../../common/Button';
import KnowYourProgressImage from '../../../assets/Images/Know_your_progress.png';
import CompareWithOthersImage from '../../../assets/Images/Compare_with_others.png';
import PlanYourLessonsImage from '../../../assets/Images/Plan_your_lessons.png';

const LearningLanguageSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 mt-[150px] justify-center items-center text-center">
      <div className="text-4xl font-bold">
        Your swiss knife for <HighlightText text={'learning any language'} />
      </div>
      <p className="text-base font-medium text-richblack-600">
        Using spin making learning multiple languages easy. With 20+ languages
        realistic voice-over, <br></br> progress tracking, custom schedule and
        more.
      </p>
      <div className="flex flex-row items-center justify-center mt-5">
        {/* Calendar Images */}
        <img
          src={KnowYourProgressImage}
          alt="KnowYourProgress Image"
          className="object-contain -mr-32 -mt-14"
        />
        <img
          src={CompareWithOthersImage}
          alt="CompareWithOthers Image"
          className="object-contain"
        />
        <img
          src={PlanYourLessonsImage}
          alt="PlanYourLessons Image"
          className="object-contain -scroll -ml-36 -mt-14"
        />
      </div>
      <div className="w-fit mb-[100px]">
        <CTAButton active={true} linkto={'/signup'}>
          Learn More
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
