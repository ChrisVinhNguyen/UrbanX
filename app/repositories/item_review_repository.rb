class ItemReviewRepository
  def all_item_reviews_for_this_item(item)
    item_reviews = item.item_reviews
  end

  def new_item_review(item, attributes)
		item_review = item.item_reviews.create(attributes)
  end

  def update(item_review, updated_attributes)
		item_review.update(updated_attributes)
  end

  def save(item_review)
    if item_review.save
      puts("saved")
    else
      puts(item_review.errors.full_messages)
    end
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
