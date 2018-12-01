class SearchForItem
  include Interactor

  def validate_context(context)
    %i[search_value item_status].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      item_repo = ItemRepository.new

      items = item_repo.search(context.search_value, context.item_status)
      context.items = items
    else
      context.fail!(message: "invalid context params")
    end
  end
end