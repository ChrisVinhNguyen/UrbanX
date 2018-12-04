class UpdateItemReview
  include Interactor

  def validate_context(context)
    %i[item item_review_params item_review_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      item_review_repo = ItemReviewRepository.new
      item_review = item_review_repo.find_by_id(context.item, context.item_review_id)
      if item_review.class != String
        item_review.updated_at = DateTime.now
        item_review_repo.update(item_review, context.item_review_params)
        context.item_review = item_review
      else
        context.fail!(message: "can't find item review")
      end
    else
      context.fail!(message: "invalid context params")
    end
  end
end