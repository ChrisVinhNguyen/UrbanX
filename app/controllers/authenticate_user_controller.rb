class AuthenticateUserController < ApplicationController
  def is_user_signed_in?
    if user_signed_in?
      context_params = {
        current_user: current_user
      }

      result = GetUserInfo.call(context_params)

      if result.success?
        render :json => { "is_signed_in" => true, "user_info" => result.user_info }.to_json()
      end
    else
      render :json => { "is_signed_in" => false, "user_info" => {} }.to_json()
    end
  end
end
