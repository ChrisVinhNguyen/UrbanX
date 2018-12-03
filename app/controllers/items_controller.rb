class ItemsController < ApplicationController
  def create
    if user_signed_in?
    
      @item = Item.new(item_params)


      @item.user_id = @current_user.id
      @item.status = "available"
      @item.date_posted = DateTime.now

      @user_profile = UserProfile.find(current_user.user_profile.id)
      @user_profile.points = @user_profile.points + 1
      @user_profile.save
      
      if @item.save
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
    puts(params[:page_number])
    context_params = {
      search_value: params[:search],
      item_status: "available",
      category: params[:cur_category], 
      page_number: params[:page_number]
    }

    result = FilterItemsList.call(context_params)

    if result.success?
      result.items.each_with_index do |resultItem, index|
          @images = []
          if resultItem.images.attached?
              resultItem.images.each do |image|
                @images.push(rails_blob_url(image))
              end
          end   
          result.items_summary_array[index][:images] = @images
      end
      render :json => { "filtered_items" => result.items_summary_array, "total_pages" => result.total_pages }
    end
  end

  def myItems
    context_params = {
      profile_id: params[:current_user_profile_id],
    }

    result = GetProfileItemsList.call(context_params)

    if result.success?
      puts(result)
      puts("**************")
      result.items.each_with_index do |resultItem, index|
          @images = []
          if resultItem.images.attached?
              resultItem.images.each do |image|
                @images.push(rails_blob_url(image))
              end
          end   
          puts(@images)
          result.items_summary_array[index][:images] = @images
          puts(result.items_summary_array)
          puts("111111111111111111")
      end
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
    puts("!!!!!!!!!!!!!!!!!!")
    puts(result)
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
          @images.push(rails_blob_url(image))
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
