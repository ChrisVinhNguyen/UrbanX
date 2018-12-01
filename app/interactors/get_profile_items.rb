class GetProfileItems
  include Interactor

  def validate_context(context)
    %i[profile_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_profile_repo = UserProfileRepository.new
      item_repo = ItemRepository.new

      user_profile = user_profile_repo.find_by_id(context.profile_id)
      items = item_repo.find_all_user_items(user_profile.user_id)

      context.items = items
    else
      context.fail!(message: "invalid context params")
    end
  end
end