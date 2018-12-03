class AddUserReviewInfo
  include Interactor

  def validate_context(context)
    %i[user_profile reviewee_id reviewer_id user_review_params].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_review_repo = UserReviewRepository.new

      user_review = user_review_repo.new_user_review(context.user_profile, context.user_review_params)
      user_review.reviewer_id = context.reviewer_id
      user_review.reviewee_id = context.reviewee_id
      user_review.created_at = DateTime.now
      user_review.updated_at = DateTime.now 

      user_review_repo.save(user_review)
      context.user_review = user_review
    else
      context.fail!(message: "invalid context params")
    end
  end
end