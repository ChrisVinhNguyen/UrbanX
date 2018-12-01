class UserReviewRepository
  def get_all_user_reviews_by_reviewee_id(id)
    UserReview.where(reviewee_id: id)
  end
end
