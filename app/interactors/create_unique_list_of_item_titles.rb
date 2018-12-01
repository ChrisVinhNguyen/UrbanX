class CreateUniqueListOfItemTitles
  include Interactor

  def validate_context(context)
    %i[items].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      item_names = context.items.pluck(:name)
      item_names_array = (item_names.map { |item_name| { title: item_name }}).uniq
      context.item_names_array = item_names_array
    else
      context.fail!(message: "invalid context params")
    end
  end
end