import learningGridData from '../../../data/learningGridData';
import { getCardClassName } from '../../../utils/helperFunctions/getCardClassName';
import CardContent from './CardContent';

const LearningGrid: React.FC = () => {
  return (
    <div className="grid mx-auto grid-col-1 lg:grid-cols-4 mb-48 mt-12 lg:mt-24 px-4 lg:px-0">
      {learningGridData.map((card, index) => {
        const className = getCardClassName(index, card);

        return (
          <div key={index} className={className}>
            <CardContent card={card} />
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
