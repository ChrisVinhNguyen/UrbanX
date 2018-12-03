class DestroyItemReview
  include Interactor

  def validate_context(context)
    %i[item item_review_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      item_review_repo = ItemReviewRepository.new
      item_review = item_review_repo.find_by_id(context.item, context.item_review_id)
      item_review_repo.delete(item_review)
    else
      context.fail!(message: "invalid context params")
    end
  end
end