class UserProfileRepository
  def all
    UserProfile.all
  end

  def new_user_profile(attributes)
    UserProfile.new(attributes)
  end

  def update(user_profile, updated_attributes)
    user_profile.update(updated_attributes)
  end

  def save(user_profile)
    user_profile.save
  end

  def delete(user_profile)
    user_profile.destroy
  end

  def find_by_id(id)
    UserProfile.find(id)
  end
end
