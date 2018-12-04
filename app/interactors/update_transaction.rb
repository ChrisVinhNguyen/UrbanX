class UpdateTransaction
  include Interactor

  def validate_context(context)
    %i[item transaction_params transaction transaction_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      transaction_repo = TransactionRepository.new
      item_repo = ItemRepository.new
      transaction = transaction_repo.find_by_id(context.item, context.transaction_id)
      if context.transaction[:status] == 'lent'
        context.transaction_params[:lend_date] = DateTime.now
        context.transaction_params[:status] = 'lent'
      elsif context.transaction[:status] == 'completed'
        context.transaction_params[:return_date] = DateTime.now
        context.transaction_params[:status] = 'completed'
      end

      transaction_repo.update(transaction, context.transaction_params)
      
      if context.transaction[:status] == 'completed'
        item_repo.update(context.item, {:status => 'available'})
      elsif context.transaction[:status] == 'lent'
        item_repo.update(context.item, {:status => 'unavailable'})
      end

      context.transaction = transaction
    else
      context.fail!(message: "invalid context params")
    end
  end
end
