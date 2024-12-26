import { FaShareFromSquare } from 'react-icons/fa6';
import Thumbnail from '../../../assets/Images/aboutus1.webp';
import CTButton from '../../common/Button';

const BuyCourseCard: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-richblack-800 p-5 gap-y-4 rounded-lg lg:mt-[23%]">
      <img
        src={Thumbnail}
        alt="Course thumbnail"
        className="h-[250px] w-[380px] rounded-lg"
      />
      <p className="text-4xl text-richblack-5 font-semibold">Rs. 699</p>

      <CTButton active={true} linkto="">
        Buy now
      </CTButton>
      <CTButton active={false} linkto="">
        Add to Cart
      </CTButton>

      <p className="text-md text-richblack-100 text-center mt-2">
        30-Day Money-Back Guarantee
      </p>

      <p className="text-xl text-richblack-50 font-semibold">
        This Course Includes :{' '}
      </p>

      <div className=" text-yellow-25 flex mx-auto gap-x-4">
        <FaShareFromSquare size={22} />
        <p className="text-md">Share</p>
      </div>
    </div>
  );
};

export default BuyCourseCard;
