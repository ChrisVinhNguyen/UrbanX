class SearchForAvailableItems
  include Interactor::Organizer

  organize SearchForItem, CreateUniqueListOfItemTitles
end