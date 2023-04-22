import ReviewExcerpt from "./ReviewExcerpt";

const ReviewsList = () => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ReviewExcerpt />
      <ReviewExcerpt />
      <ReviewExcerpt />
      <ReviewExcerpt />
      <ReviewExcerpt />
    </ul>
  );
};

export default ReviewsList;
