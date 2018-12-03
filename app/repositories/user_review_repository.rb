class UserReviewRepository
  def all_user_reviews_for_this_user(item)
    item_reviews = item.item_reviews
  end

  def new_user_review(reviewee, attributes)
		item_review = reviewee.user_reviews.create(attributes)
  end

  def update(item_review, updated_attributes)
		item_review.update(updated_attributes)
  end

  def save(user_review)
  	user_review.save
  end

  def delete(item_review)
    item_review.destroy
  end

  def find_by_id(item, id)
    #puts(item.inspect)
    puts("========")
    puts(id)
    puts("========")
    #puts(item.item_reviews.inspect)
  	item_review = item.item_reviews.find(id)  
  end
end
