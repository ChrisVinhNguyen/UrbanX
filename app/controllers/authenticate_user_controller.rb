class AuthenticateUserController < ApplicationController
  def is_user_signed_in?
    if user_signed_in?
      user_profile = current_user.user_profile
      user_info = {
        "user_id" => current_user.id,
        "email" => current_user.email,
        "user_profile_id" => user_profile.id,
        "full_name" => user_profile.full_name,
        "first_name" => user_profile.first_name,
        "last_name" => user_profile.last_name,
        "picture" => user_profile.picture,
        "date_of_birth" => user_profile.date_of_birth,
        "location" => user_profile.location,
        "contact_list" => user_profile.contact_list
      }
      render :json => { "is_signed_in" => true, "user_info" => user_info }.to_json()
    else
      render :json => { "is_signed_in" => false, "user_info" => {} }.to_json()
    end
  end
end
