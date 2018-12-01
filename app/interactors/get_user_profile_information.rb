class GetUserProfileInformation
  include Interactor::Organizer

  organize FindUserProfile, GetUserProfileContacts, CreateUserProfileInfoHash
end