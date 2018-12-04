class CreateNewTransaction
  include Interactor::Organizer

  organize FindItem, AddTransactionInfo
end