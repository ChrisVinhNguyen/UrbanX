class AddItemReviewInfo
  include Interactor

  def validate_context(context)
    %i[item item_review_params owner_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      item_review_repo = ItemReviewRepository.new
      item_review = item_review_repo.new_item_review(context.item, context.item_review_params)
      item_review.created_at = DateTime.now
      item_review.updated_at = DateTime.now 
      item_review.owner_id = context.owner_id
      
      item_review_repo.save(item_review)
      context.item_review = item_review
    else
      context.fail!(message: "invalid context params")
    end
  end
end