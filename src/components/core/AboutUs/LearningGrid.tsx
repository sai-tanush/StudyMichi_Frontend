import learningGridData from '../../../data/learningGridData';
import HighlightText from '../Homepage/HighlightText';
import CTAButton from '../../common/Button';

const LearningGrid: React.FC = () => {
  return (
    <div className="grid mx-auto grid-col-1 lg:grid-cols-4 mb-10 mt-24">
      {learningGridData.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && 'lg:col-span-2 lg:h-[250px]'}
            ${
              card.order % 2 === 1
                ? 'bg-richblack-700 lg:h-[250px]'
                : 'bg-richblack-900 lg:h-[250px]'
            }
            ${card.order === 3 && 'lg:col-start-2'}
            `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[80%] flex flex-col pb-5 gap-3 ml-20">
                <div className="text-4xl text-left font-semibold text-richblack-5">
                  {card.heading} <br></br>
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-400 text-sm text-left font-semibold">
                  {card.description}
                </p>
                <div className="w-fit lg:mt-8">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 py-8 lg:w-[80%] mx-auto lg:mt-2">
                <h1 className="text-richblack-5 font-semibold text-left ">
                  {card.heading}
                </h1>
                <p className="text-richblack-50 text-sm text-left font-semibold">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
