class DestroyTransaction
  include Interactor

  def validate_context(context)
    %i[item transaction_id current_user_id].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      transaction_repo = TransactionRepository.new
      transaction = transaction_repo.find_by_id(context.item, context.transaction_id)
      if context.current_user_id == transaction.lender_id
        UserMailer.with(transaction: transaction).notify_borrower_declined_request.deliver_later
      elsif context.current_user_id == transaction.borrower_id
        UserMailer.with(transaction: transaction).notify_lender_cancelled_request.deliver_later
      end

      transaction_repo.delete(transaction)
    else
      context.fail!(message: "invalid context params")
    end
  end
end
