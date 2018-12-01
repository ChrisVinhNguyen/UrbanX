class GetUserReviews
  include Interactor

  def validate_context(context)
    %i[user_profile].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_profile_repo = UserReviewRepository.new

      user_reviews = user_profile_repo.get_all_user_reviews_by_reviewee_id(reviewee_id: context.user_profile.user_id)

      context.user_reviews = user_profile
    else
      context.fail!(message: "invalid context params")
    end
  end
end