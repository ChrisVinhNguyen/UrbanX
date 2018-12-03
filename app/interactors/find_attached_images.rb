class FindItem
	include Interactor 

	def validate_context(context)
		%i[item_id].all? {|key| context.instance_values["table"].key? key}
	end

	def call
		if validate_context(context)
			images = []
			image_attachments_id = []
  		if context.item.images.attached?
      	context.item.images.each do |image|
        	images.push(url_for(image))
        	image_attachments_id.push(image.id)
     		end   
  		end
    	item_details= context.item.attributes
    	item_details[:images]= images
    	item_details[:image_attachments_id] = image_attachments_id
			
			context.item_details = item_details
		else
			context.fail!(message: "invalid context params")
		end
	end
end
