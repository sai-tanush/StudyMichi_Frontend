import HighlightText from '../Homepage/HighlightText';

const Quote: React.FC = () => {
  return (
    <div className="text-center text-4xl font-bold">
      <h1 className="text-richblack-100 leading-normal ">
        <span className="text-richblack-500 text-5xl">" </span>
        We are passionate about revolutionizing the way we learn. Our <br></br>
        innovative platform <HighlightText text={` combines texhnology`} />,
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819]">
          {' '}
          expertise
        </span>
        and community to <br></br>create an{' '}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#E65C00] to-[#F9D423]">
          unparalleled educational experience.
        </span>
        <span className="text-richblack-500"> "</span>
      </h1>
    </div>
  );
};

export default Quote;
