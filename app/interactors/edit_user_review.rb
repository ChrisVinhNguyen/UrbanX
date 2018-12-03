class EditUserReview
  include Interactor::Organizer

  organize FindUserProfile, UpdateUserReview
end