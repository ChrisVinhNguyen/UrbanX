class AddTransactionInfo
  include Interactor

  def validate_context(context)
    %i[item transaction_params borrower_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      transaction_repo = TransactionRepository.new
      transaction = transaction_repo.new_transaction(context.item, context.transaction_params)
      transaction.borrower_id = context.borrower_id
      transaction.lender_id = context.item.user_id
      transaction.item_name = context.item.name
      transaction_repo.save(transaction)
      UserMailer.with(transaction: transaction).notify_lender.deliver_later
      context.transaction = transaction
    else
      context.fail!(message: "invalid context params")
    end
  end
end
