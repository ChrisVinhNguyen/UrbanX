class ItemsController < ApplicationController
  def create
    if user_signed_in?
    
      @item = Item.new(item_params)


      @item.user_id = @current_user.id
      @item.status = "available"
      @item.date_posted = DateTime.now
      
      if @item.save
          #redirect_to @item
          render json: @item.id
      else
        puts(@item.errors.full_messages)
        render :new
      end
    else
        redirect_to new_user_session_path
    end
  end

  def new
    @item = Item.new
  end

  def filter
    context_params = {
      search_value: params[:search],
      item_status: "available",
      category: params[:cur_category]
    }

    result = FilterItemsList.call(context_params)

    if result.success?
      render :json => { "filtered_items" => result.items_summary_array }
    end
  end

  def myItems
    context_params = {
      profile_id: params[:current_user_profile_id],
    }

    result = GetProfileItemsList.call(context_params)

    if result.success?
      render :json => { "filtered_items" => result.items_summary_array }
    end
  end

  def search
    context_params = {
      search_value: params[:search],
      item_status: "available",
      category: "All"
    }

    result = SearchForAvailableItems.call(context_params)

    if result.success?
      render json: { "searched_item_names" => result.item_names_array }
    end
  end

  def index
    @items = Item.all
  end

  def show
  #   context_params = {
  #     item_id: params[:id]
  #   }

  #   result = ShowItem.call(context_params)

  #   if result.success?
  #     render json: result.item
  #   end
  # end

    
    @item = Item.find(params[:id])
    @images = []
    @image_attachments_id = []
    if @item.images.attached?
        @item.images.each do |image|
          @images.push(url_for(image))
          @image_attachments_id.push(image.id)
        end   
        
    end
    item_details= @item.attributes
    item_details[:images]= @images
    item_details[:image_attachments_id] = @image_attachments_id

    item_reviews_count = @item.item_reviews.count
    item_reviews_total = 0
    @item.item_reviews.each do |item_review|
      item_reviews_total += item_review.rating
    end
    

   average_rating = item_reviews_total!=0 ? item_reviews_total/item_reviews_count : 'no rating' 

    item_details[:average_rating] = average_rating

    
    render json: item_details
 end
    
  def edit
    if user_signed_in?
      @item = Item.find(params[:id])
      puts(params)
      if @item.user_id != @current_user.id
        redirect_to items_path
      end
    end
  end

  def update
    if user_signed_in?
      context_params = {
      item_id: params[:id],
      item_params: item_params
      } 

      result = UpdateItem.call(context_params)
      if result.success?
        render json: result.item
      end
    else
      redirect_to new_user_session_path
    end
  end
      
      #@item = Item.find(params[:id])
      #if @item.user_id = @current_user.id

        #if @item.update(item_params)
          #redirect_to @item
        #else
          #render 'edit'
        #end
      #end
    #else
        #redirect_to new_user_session_path
  #end

  def destroy
    if user_signed_in?
      @item = Item.find(params[:id])
      if @item.user_id = @current_user.id
        @item.destroy

        redirect_to items_path
      end
    end
  end

  def delete_image_attachment
    @image = ActiveStorage::Attachment.find(params[:item_id])
    @image.purge_later
    redirect_back(fallback_location: items_path)
  end

  def delete_image
    @image = ActiveStorage::Attachment.find(params[:id])
    @image.purge_later
    # redirect_back(fallback_location: items_path)
  end


private
  def item_params
    params.require(:item).permit(:name, :description, :category,  :quantity,  :condition, :value, :user_id, :status , images: [] ) #
  end
end
