class UserReviewRepository
  def all_user_reviews_for_this_user(reviewee)
    user_reviews = reviewee.user_reviews
  end

  def new_user_review(reviewee, attributes)
		user_review = reviewee.user_reviews.create(attributes)
  end

  def update(item_review, updated_attributes)
		item_review.update(updated_attributes)
  end

  def save(user_review)
  	user_review.save
  end

  def delete(user_review)
    user_review.destroy
  end

  def find_by_id(reviewee, id)
  	user_review = reviewee.user_reviews.find(id)  
  end
end
