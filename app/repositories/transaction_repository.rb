class TransactionRepository
	def new_transaction(item, attributes)
		transaction = item.transactions.create(attributes)
	end

	def save(transaction)
	    transaction.save
	end

	def find_by_id(item, id)
	  	transaction = item.transactions.find(id)  
	end

	def update(transaction, updated_attributes)
	  	transaction.update(updated_attributes)  
	end

	def delete(transaction)
		transaction.destroy
	end
end