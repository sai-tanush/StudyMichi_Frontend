import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../../HighlightText';
import CTAButton from '../../Button';
import Banner from '../../../assets/Images/banner.mp4';
import CodeBlocks from '../../CodeBlocks';
import TimelineSection from './TimelineSection';
import LearningLanguageSection from './LearningLanguageSection';
import InstructorSection from './InstructorSection';
import ReviewSection from './ReviewSection';
import ExploreMore from './ExploreMore';
import Footer from '../../Footer';

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
            <div className="flex items-center space-x-1 rounded-full px-10 py-[5px] group-hover:bg-richblack-900 shadow-richblack-500 shadow-sm">
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

        <div className="mx-3 my-12 shadow-blue-200 shadow-xl">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={'lg: flex-row'}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={` coding potential `} />
                with our online courses
              </div>
            }
            subheading={`Our courses are designed and taught by industry experts who have years of 
            experience in coding and are passionate about sharing their knowledge with you.`}
            ctabtn1={{
              btnText: 'Try it Yourself',
              linkto: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn More',
              linkto: '/login',
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html\n<head>\n<title>Example</title>
            <linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a></h1>
            <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a></nav>\n</body>\n</html>`}
            codeColor={'text-yellow-25'}
            backgroundGradient={'yellow'}
          />
        </div>
        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={'lg: flex-row-reverse'}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={` coding in seconds `} />
                with our online courses
              </div>
            }
            subheading={`Go ahead, give it a try. Our hands-on learning environment
            means you'll be writing real code from your very first lesson.`}
            ctabtn1={{
              btnText: 'Continue Lesson',
              linkto: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn More',
              linkto: '/login',
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html\n<head>\n<title>Example</title>
            <linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a></h1>
            <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a></nav>\n</body>\n</html>`}
            codeColor={'text-yellow-25'}
            backgroundGradient={'blue'}
          />
        </div>
        {/* Explore More */}
        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px] w-screen">
          <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto">
            <div className="w-full flex justify-center mt-[150px]">
              <div className="mt-20 gap-7 flex flex-row items-center">
                <CTAButton active={true} linkto={'/signup'}>
                  <div className="flex flex-row gap-2 items-center">
                    Explore Full Catalog
                    <FaArrowRight />
                  </div>
                </CTAButton>
                <CTAButton active={false} linkto={'/login'}>
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-[100px] w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-7">
          <div className="flex flex-row justify-between">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightText text={` job that is in demand.`} />
            </div>
            <div className="flex flex-col gap-10 w-[50%] items-start">
              <p className="text-[16px] text-richblack-600 font-inter font-medium">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true} linkto={'/signup'}>
                Learn More
              </CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div
        className="w-11/12 mx-auto my-[100px] max-w-maxContent flex flex-col items-center justify-between gap-8 
      first-letter bg-richblack-900 text-white"
      >
        {/* Top Div */}
        <InstructorSection />
        {/* Review Div Bottom */}
        <ReviewSection />
      </div>

      {/* Section 4 */}
      <Footer />
    </div>
  );
};

export default Homepage;
