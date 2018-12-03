class SearchForItems
  include Interactor

  def validate_context(context)
    %i[search_value item_status category].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      item_repo = ItemRepository.new

      if (context.category == "All")
        items = item_repo.search(context.search_value, context.item_status)
      else
        items = item_repo.search_with_category(context.search_value, context.item_status, context.category)
      end

      context.items = items
      puts(context.items.inspect())
    else
      context.fail!(message: "invalid context params")
    end
  end
end