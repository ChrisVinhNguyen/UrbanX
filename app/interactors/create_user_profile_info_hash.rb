class CreateUserProfileInfoHash
  include Interactor
  # include ActionView::Helpers
  # include ActionDispatch::Routing
  # include Rails.application.routes.url_helpers

  def validate_context(context)
    %i[user_profile contact_list].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      profile_info_hash = context.user_profile.attributes
      profile_info_hash[:contact_list] = context.contact_names
      profile_info_hash[:email] = context.user_profile.user.email
      # if context.user_profile.image.attached?
      #   profile_info_hash[:image] = url_for(context.user_profile.image)
      #   profile_info_hash[:image_attachment_id] = context.user_profile.image.id
      # end

      context.profile_info_hash = profile_info_hash
    else
      context.fail!(message: "invalid context params")
    end
  end
end