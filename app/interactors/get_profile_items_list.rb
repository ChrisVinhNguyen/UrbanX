class GetProfileItemsList
  include Interactor::Organizer

  organize GetProfileItems, PaginateItemResults, AddItemSummaryInfo
end