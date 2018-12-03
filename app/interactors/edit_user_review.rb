class EditUserReview
  include Interactor::Organizer

  organize FindUserProfile, EditUserReviewInfo
end