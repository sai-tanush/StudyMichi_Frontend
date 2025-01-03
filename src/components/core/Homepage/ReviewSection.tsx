import ReviewSlider from '../../common/ReviewSlider';

const ReviewSection = () => {
  return (
    <div>
      <div className="text-4xl font-bold text-center mt-[150px] ">
        Reviews from other learners
      </div>
      {/* Review Cards */}
      <ReviewSlider />
    </div>
  );
};

export default ReviewSection;
