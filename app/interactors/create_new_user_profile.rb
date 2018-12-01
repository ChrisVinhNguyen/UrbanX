class CreateNewUserProfile
  include Interactor

  def validate_context(context)
    %i[user_profile_params].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_profile_repo = UserProfileRepository.new

      user_profile = user_profile_repo.new_user_profile(context.user_profile_params)
      user_profile.created_at = DateTime.now
      user_profile.updated_at = DateTime.now 
      user_profile.user_id = context.current_user.id

      if user_profile_repo.save(user_profile)
        context.user_profile = user_profile
      else
        context.fail!(message: "invalid user_profile_params")
      end
    else
      context.fail!(message: "invalid context params")
    end
  end
end