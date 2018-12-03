class DeleteUserReview
  include Interactor::Organizer

  organize FindUserProfile, DestroyUserReview
end