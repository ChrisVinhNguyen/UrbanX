class EditTransaction
  include Interactor::Organizer

  organize FindItem, UpdateTransaction
end