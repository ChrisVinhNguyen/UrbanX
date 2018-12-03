class CreateNewItemReview
  include Interactor::Organizer

  organize FindItem, AddItemReviewInfo
end