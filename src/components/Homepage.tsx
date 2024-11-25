import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  return (
    <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between text-white">
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
      </div>
    </div>
  );
};

export default Homepage;
