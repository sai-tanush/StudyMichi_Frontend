import TimelineImage from '../../../assets/Images/TimelineImage.png';
import { HOMEPAGE_TIMELINEELEMENTS_DATA } from '../../../data/homepage-data';

const TimelineSection: React.FC = () => {
  return (
    <div>
      {/* Outer Big Box */}
      <div className="flex flex-row gap-5 items-center mt-5">
        {/* Left Section */}
        <div className="lg:w-[60%] ml-6 lg:ml-0 flex flex-col gap-5">
          {HOMEPAGE_TIMELINEELEMENTS_DATA.map((element, index) => {
            return (
              <div className="flex flex-row gap-6" key={index}>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div
                    className="w-[60px] h-[60px] bg-white flex items-center justify-center 
                  rounded-full mt-[-10px] shadow-xl"
                  >
                    <img src={element.Logo} alt="Specific Functionality Logo" />
                  </div>
                  {element.line && (
                    <div className=" h-10 border-r-2 border-dotted border-pure-greys-200 "></div>
                  )}
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.Heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Right Section-Image */}
        <div className="relative shadow-blue-200">
          <img
            src={TimelineImage}
            alt="Timeline Image"
            className="shadow-2xl shadow-blue-200 hidden lg:block"
          />
          <div
            className="absolute bg-caribbeangreen-700 flex lg:flex-row text-white uppercase py-4 lg:py-7 px-5 lg:px-10 
            lg:left-[50%] translate-x-[-110%] lg:translate-x-[-50%] translate-y-[340%] lg:translate-y-[-50%]"
          >
            <div className="flex flex-row gap-4">
              <p className="text-lg lg:text-3xl font-bold">10</p>
              <div className="flex flex-col gap-2 border-r border-caribbeangreen-500">
                <p className="text-caribbeangreen-300 text-xs lg:text-sm pr-5">
                  Years
                </p>
                <p className="text-caribbeangreen-300 text-xs lg:text-sm pr-5">
                  Experience
                </p>
              </div>
              <p className="text-lg lg:text-3xl font-bold">250</p>
              <div className="flex flex-col gap-2">
                <p className="text-caribbeangreen-300 text-xs lg:text-sm">
                  Types of
                </p>
                <p className="text-caribbeangreen-300 text-xs lg:text-sm">
                  Courses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
