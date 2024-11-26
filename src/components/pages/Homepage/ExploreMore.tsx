import { useState } from 'react';
import HighlightText from '../../HighlightText';
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const tabsName = [
  'Free',
  'New to coding',
  'Most popular',
  'Skills paths',
  'Career paths',
];

const ExploreMore: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading,
  );

  const setMyCards = (value: string) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="flex flex-col gap-3 text-center">
      <div className="text-4xl font-semibold">
        Unlock the <HighlightText text={'Power of Code'} />
      </div>
      <div className="text-base font-medium text-richblack-200">
        Learn To Build Anything You Can Imagine
      </div>

      <div className="my-5 flex flex-row gap-1 mx-auto bg-richblack-700 rounded-full px-1 py-1">
        {tabsName.map((element, index) => {
          return (
            <div
              key={index}
              className={`text-[16px] flex flex-row items-center gap-2 
                        ${
                          currentTab === element
                            ? 'bg-richblack-900 text-richblack-5 font-medium'
                            : ' text-richblack-200'
                        }
                            rounded-full transition-all duration-200 cursor-pointer
                            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 `}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[150px]"></div>

      {/* Course Card */}
      <div className="absolute bottom-[54.5%] flex flex-row gap-10 justify-between w-full ">
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
