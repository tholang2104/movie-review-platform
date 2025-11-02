import React, { useState } from 'react';

const ReviewForm = ({ movieId, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    rating: initialData.rating || 5,
    comment: initialData.comment || '',
    reviewerName: initialData.reviewerName || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ movieId, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="mb-3">
        <label htmlFor="reviewerName" className="form-label">Your Name</label>
        <input
          type="text"
          className="form-control"
          id="reviewerName"
          name="reviewerName"
          value={formData.reviewerName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">Rating</label>
        <select
          className="form-select"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">Review Comment</label>
        <textarea
          className="form-control"
          id="comment"
          name="comment"
          rows="4"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Share your thoughts about this movie..."
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
