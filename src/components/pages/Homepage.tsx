import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../HighlightText';
import CTAButton from '../Button';
import Banner from '../../assets/Images/banner.mp4';

const Homepage: React.FC = () => {
  return (
    <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between text-white">
      {/* Section 1 */}
      <div>
        <Link to={'/signup'}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-300 transition-all duration-200
          hover:scale-95 w-fit"
          >
            <div className="flex items-center space-x-1 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with <HighlightText text={'Coding Skills'} />
        </div>

        <div className="mt-4 mx-auto w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="w-full flex justify-center">
          <div className="mt-8 gap-7 flex flex-row items-center">
            <CTAButton active={true} linkto={'/signup'}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={'/login'}>
              Book a Demo
            </CTAButton>
          </div>
        </div>

        <div className="mx-3 my-12 shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
