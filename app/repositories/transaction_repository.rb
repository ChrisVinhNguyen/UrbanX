class TransactionRepository
	def new_transaction(item, attributes)
		transaction = item.transactions.create(attributes)
	end

end