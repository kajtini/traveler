import React from "react";

interface EditReviewFormProps {
  handleEditReviewSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  editedReviewContent: string;
  handleEditReviewContentChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleCancelEditReview: () => void;
}

const EditReviewForm = ({
  handleEditReviewSubmit,
  editedReviewContent,
  handleEditReviewContentChange,
  handleCancelEditReview,
}: EditReviewFormProps) => {
  return (
    <form onSubmit={handleEditReviewSubmit}>
      <textarea
        className="min-h-[200px] w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-2 focus:outline-none"
        value={editedReviewContent}
        onChange={handleEditReviewContentChange}
      ></textarea>

      <div className="grid grid-cols-2 gap-3">
        <button
          className="rounded-3xl border border-indigo-500 py-1"
          onClick={(e) => {
            e.preventDefault();
            handleCancelEditReview();
          }}
        >
          Cancel
        </button>
        <button className="rounded-3xl bg-indigo-500 py-1">Save</button>
      </div>
    </form>
  );
};

export default EditReviewForm;
