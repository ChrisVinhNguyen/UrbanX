class GetUserInfo
  include Interactor

  def validate_context(context)
    %i[current_user].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_profile = context.current_user.user_profile
      user_info = {
        "user_id" => context.current_user.id,
        "email" => context.current_user.email,
        "user_profile_id" => user_profile.id,
        "first_name" => user_profile.first_name,
        "last_name" => user_profile.last_name,
        "full_name" => user_profile.full_name,
        "picture" => user_profile.picture,
        "date_of_birth" => user_profile.date_of_birth,
        "location" => user_profile.location,
        "contact_list" => user_profile.contact_list
      }

      context.user_info = user_info
    else
      context.fail!(message: "user is not signed in")
    end
  end
end