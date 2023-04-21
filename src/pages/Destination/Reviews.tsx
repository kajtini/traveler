import AddReviewForm from "./AddReviewForm";

const Reviews = () => {
  return (
    <div className="flex flex-col">
      <p className="mb-2 text-lg font-bold ">See what other people think</p>

      <AddReviewForm />
      {/* Review List */}
    </div>
  );
};

export default Reviews;
