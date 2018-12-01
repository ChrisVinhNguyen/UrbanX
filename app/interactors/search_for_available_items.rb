class SearchForAvailableItems
  include Interactor::Organizer

  organize SearchForItems, CreateUniqueListOfItemTitles
end