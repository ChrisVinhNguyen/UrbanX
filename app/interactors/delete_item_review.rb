class DeleteItemReview
  include Interactor::Organizer

  organize FindItem, DestroyItemReview
end