class ItemsController < ApplicationController
  def create
    if user_signed_in?

      @item = Item.new(item_params)

      @item.user_id = @current_user.id
      @item.status = "available"
      
      if @item.save
          redirect_to @item
      else
        render :new
      end
    else
        redirect_to new_user_session_path
    end
  end

  def new
    @item = Item.new
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
    #@item =  Item.find_by(name: @item_name)
    #puts "--------------------searching for "+@item_name
    #puts @item.description


  end

  def index
    @items = Item.all
    items_array = []

    @items.each do |item|
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

    render json: items_array
  end

  def show
    @item = Item.find(params[:id])
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
      params.require(:item).permit(:name, :description, :category,  :quantity,  :condition, :value, :user_id, :status, images: [])
    end
end
