class UserProfileRepository
  def find_by_id(id)
    UserProfile.find(id)
  end
end
