class CheckIfUserIsSignedIn < ApplicationController
  include Interactor

  def call
    if user_signed_in?
      context.is_signed_in = true
    else
      context.fail!(message: "user is not signed in")
    end
  end
end