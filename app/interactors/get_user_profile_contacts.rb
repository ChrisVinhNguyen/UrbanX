class GetUserProfileContacts
  include Interactor

  def validate_context(context)
    %i[user_profile].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_profile_repo = UserProfileRepository.new

      contact_list = []
      context.user_profile.contact_list.each do |contact_id|
        contact_profile = user_profile_repo.find_by_id(contact_id)
        contact_list.insert(contact_id.to_i,contact_profile.first_name + " " + contact_profile.last_name)
      end

      context.contact_list = contact_list
    else
      context.fail!(message: "invalid context params")
    end
  end
end