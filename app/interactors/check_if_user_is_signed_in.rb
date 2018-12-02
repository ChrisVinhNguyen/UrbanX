class CheckIfUserIsSignedIn < ApplicationController
  include Interactor

  def validate_context(context)
    %i[is_user_signed_in].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context) && context.is_user_signed_in
      puts "User is signed in"
    else
      context.fail!(message: "user is not signed in")
    end
  end
end