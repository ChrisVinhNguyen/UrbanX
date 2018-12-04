class DeleteTransaction
  include Interactor::Organizer

  organize FindItem, DestroyTransaction
end