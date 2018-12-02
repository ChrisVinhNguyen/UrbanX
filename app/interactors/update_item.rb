class UpdateItem
	include Interactor 

	def validate_context(context)
		%i[item_id item_params].all? {|key| context.instance_values["table"].key? key}
	end

	def call
		if validate_context(context)
			item_repo = ItemRepository.new 

			item = item_repo.find_by_id(context.item_id)
			item_repo.update(item, context.item_params)
			context.item = item
		else
			context.fail!(message: "invalid context params")
		end
	end
end
