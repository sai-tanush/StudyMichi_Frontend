import HighlightText from '../Homepage/HighlightText';
import CTAButton from '../../common/Button';

interface CardProps {
  card: {
    heading: string;
    highlightText?: string;
    description: string;
    BtnLink?: string;
    BtnText?: string;
    order: number;
  };
}

const CardContent: React.FC<CardProps> = ({ card }) => {
  return card.order < 0 ? (
    <div className="lg:w-[80%] flex flex-col pb-5 gap-3 lg:ml-20">
      <div className="text-4xl text-left font-semibold text-richblack-5">
        {card.heading} <br />
        <HighlightText text={card.highlightText} />
      </div>
      <p className="text-richblack-400 text-sm text-left font-semibold">
        {card.description}
      </p>
      <div className="w-fit lg:mt-8">
        {card.BtnLink && (
          <CTAButton active={true} linkto={card.BtnLink}>
            {card.BtnText}
          </CTAButton>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-5 py-8 lg:w-[80%] mx-auto lg:mt-2 px-4">
      <h1 className="text-richblack-5 font-semibold text-left">
        {card.heading}
      </h1>
      <p className="text-richblack-50 text-sm text-left font-semibold">
        {card.description}
      </p>
    </div>
  );
};

export default CardContent;
