class ItemsController < ApplicationController
  def create
      puts("creat in itemcontroller")
      # puts(params)
      # puts(item_params)
    
      
    if user_signed_in?
      puts ("-----------")
    
      @item = Item.new(item_params)
      puts ("-----------")

      @item.user_id = @current_user.id
      @item.status = "available"

      @item.date_posted = DateTime.now
      if @item.save
          redirect_to @item
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
    if (params[:cur_category]=="All")
      filtered_items = Item.where(status: "available")
    else
      filtered_items = Item.where(category: params[:cur_category], status: "available")
    end

    items_array = []

    filtered_items.each do |item|
      user = User.find(item[:user_id])
      full_name = user.user_profile[:first_name] + " " + user.user_profile[:last_name]
      item_hash = item.attributes
      item_hash[:owner] = full_name
      item_hash[:user_profile_id] = user.user_profile.id

      item_reviews_count = item.item_reviews.count
      item_reviews_total = 0
      item.item_reviews.each do |item_review|
        item_reviews_total += item_review.rating
      end
      average_rating = item_reviews_total!=0 ? item_reviews_total/item_reviews_count : 'no rating' 
      item_description = item.description

      item_hash[:average_rating] = average_rating
      item_hash[:description] = item_description

      items_array.push(item_hash)
    end

    render :json => {"filtered_items" => items_array}.to_json()
  end

  def myItems
    user_profile = UserProfile.find(params[:current_user_profile_id])
    filtered_items = Item.where(user_id: user_profile.user_id)
    items_array = []

    filtered_items.each do |item|
      user = User.find(item[:user_id])
      full_name = user.user_profile[:first_name] + " " + user.user_profile[:last_name]
      item_hash = item.attributes
      item_hash[:owner] = full_name
      item_hash[:user_profile_id] = user.user_profile.id

      item_reviews_count = item.item_reviews.count
      item_reviews_total = 0
      item.item_reviews.each do |item_review|
        item_reviews_total += item_review.rating
      end
      average_rating = item_reviews_total!=0 ? item_reviews_total/item_reviews_count : 'no rating' 
      item_description = item.description

      item_hash[:average_rating] = average_rating
      item_hash[:description] = item_description

      items_array.push(item_hash)
    end

    render :json => {"filtered_items" => items_array}.to_json()
  end


  def search
    @item_name = params[:item][:search]
    #@items= Item.find(params[:item])
    #@items = Item.where(name: @item_name)
    @items = Item.where("name ilike ? AND status = ?", "%#{@item_name}%","available")


    @items.each do |item|
      puts item.name
      puts item.description
    end

  end

  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
    #@images = []
    # if @item.images.attached?
    #     @item.images.each do |image|
    #       @images.push(url_for(image))
    #     end   
    # end
    # item_details= @item.attributes
    # item_details[:images]= @images
    item_details= @item.attributes
    @image
    if @item.image.attached?
          @image = url_for(@item.image)
          item_details[:image]= @image
    end
    
    

    #item_details[:images]= @images

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
      if @item.user_id != @current_user.id
        redirect_to items_path
      end
    end
  end

  def update
    if user_signed_in?
      @item = Item.find(params[:id])
      if @item.user_id = @current_user.id

        if @item.update(item_params)
          redirect_to @item
        else
          render 'edit'
        end
      end
    else
        redirect_to new_user_session_path
    end

  end

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

private
  def item_params
      params.require(:item).permit(:name, :description, :category,  :quantity,  :condition, :value, :user_id, :status , :image ) #images: []
    end
end
