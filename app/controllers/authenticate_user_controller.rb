class AuthenticateUserController < ApplicationController
  def is_user_signed_in?
    if user_signed_in?
      render :json => {"signed_in" => true, "user" => current_user, "user_profile" => current_user.user_profile}.to_json()
    else
      render :json => {"signed_in" => false}.to_json()
    end
  end
end
