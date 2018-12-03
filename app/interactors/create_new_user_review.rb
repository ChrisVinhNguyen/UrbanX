class CreateNewUserReview
  include Interactor::Organizer

  organize FindUserProfile, AddUserReviewInfo
end