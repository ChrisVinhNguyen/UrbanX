class FilterItemsList
  include Interactor::Organizer

  organize SearchForItems, PaginateItemResults, AddItemSummaryInfo
end