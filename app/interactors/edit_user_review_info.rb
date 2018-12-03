class EditUserReviewInfo
  include Interactor

  def validate_context(context)
    %i[user_profile user_review_params user_review_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_review_repo = UserReviewRepository.new
      user_review = user_review_repo.find_by_id(context.user_profile, context.user_review_id)
      user_review_repo.update(user_review, context.user_review_params)
      user_review.updated_at = DateTime.now 

      context.user_review = user_review
    else
      context.fail!(message: "invalid context params")
    end
  end
end