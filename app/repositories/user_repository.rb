class UserRepository
  def find_by_id(id)
    User.find(id)
  end
end
