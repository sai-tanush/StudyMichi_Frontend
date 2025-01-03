import ReviewSlider from '../../common/ReviewSlider';

const ReviewSection = () => {
  return (
    <div>
      <div className="text-xl lg:text-4xl font-bold text-center mt-10 lg:mt-[150px] ">
        Reviews from other learners
      </div>
      {/* Review Cards */}
      <ReviewSlider />
    </div>
  );
};

export default ReviewSection;
