import { HiUsers } from 'react-icons/hi';
import { ImTree } from 'react-icons/im';

interface CardDataProps {
  heading: string;
  description: string;
  level: string;
  lessionNumber: number;
}
interface CourseCardProps {
  cardData: CardDataProps;
  currentCard: string;
  setCurrentCard: React.Dispatch<React.SetStateAction<string>>;
}

const CourseCard: React.FC<CourseCardProps> = ({
  cardData,
  currentCard,
  setCurrentCard,
}) => {
  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`w-[360px] lg:w-[30%] h-[300px]  cursor-grab text-richblack-25
      ${cardData.heading === currentCard ? 'bg-white shadow-[12px_12px_0_0] shadow-yellow-50' : 'bg-richblack-800'}`}
    >
      <div className=" flex flex-col gap-3 h-[80%] p-6 border-b-2 border-dashed border-richblack-400">
        <h2
          className={`font-semibold text-xl
        ${cardData?.heading === currentCard && 'text-richblack-800'}`}
        >
          {cardData.heading}
        </h2>
        <h2 className="text-richblack-400">{cardData.description}</h2>
      </div>

      <div
        className={`flex flex-row justify-between px-6 py-3 font-medium
              ${cardData?.heading === currentCard ? 'text-blue-300' : 'text-richblack-300'}`}
      >
        <div className="flex flex-row items-center gap-2 text-base">
          <HiUsers />
          {cardData.level}
        </div>

        <div className="flex flex-row items-center  gap-2 text-base">
          <ImTree />
          {cardData.lessionNumber} Lesson
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
