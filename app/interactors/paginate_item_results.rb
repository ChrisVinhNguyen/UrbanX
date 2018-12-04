class PaginateItemResults
  include Interactor

  def validate_context(context)
    %i[items page_number].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      context.total_pages = (context.items.count/30.0).ceil
      context.items = context.items.all.page(context.page_number).per(30)
      puts(context.items.inspect())
    else
      context.fail!(message: "invalid context params")
    end
  end
end