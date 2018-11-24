class ItemReviewsController < ApplicationController
  def create
    if user_signed_in?
      print("inside of create item reviews")
      print(params[:item_review])
      @item = Item.find(params[:item_id])
      @item_review = @item.item_reviews.create(item_review_params)
      @item_review.created_at = DateTime.now
      @item_review.updated_at = DateTime.now 
      #map the user who created the review for this item       
      @item_review.owner_id = @current_user.id
      if @item_review.save
        puts("saved successfully")
        redirect_to item_path(@item)
      else
        render 'new'
      end
    else
      redirect_to new_user_session_path
    end
  end

  def new
    @item = Item.find(params[:item_id])
    @item_review = @item.item_reviews.new
  end

  def index
    @item = Item.find(params[:item_id])
    @item_reviews = @item.item_reviews

    item_reviews_array = []
    @item_reviews.each do |item_review|
      user = User.find(item_review[:owner_id])
      full_name = user.user_profile[:first_name] + " " + user.user_profile[:last_name]
      item_review_hash = item_review.attributes
      item_review_hash[:owner] = full_name

      item_reviews_array.push(item_review_hash)
    end
    render :json => {"current_viewed_item_reviews" => item_reviews_array}.to_json()
  end
  
  def show
  end
  
  def update
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @item_review = @item.item_reviews.find(params[:id])
      #check if current user is allowed to edit
      if @item_review.owner_id == @current_user.id
        if @item_review.update(item_review_params)
          puts("saved")
          @item_review.updated_at = DateTime.now
          redirect_to @item
        else
          puts("not saved")
          render 'edit'
        end
      else
        render 'edit'
      end
    else
      redirect_to new_user_session_path
    end
  end

  def edit
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @item_review = @item.item_reviews.find(params[:id])
    else
      redirect_to new_user_session_path
    end
  end

  def destroy
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @item_review = @item.item_reviews.find(params[:id])
      @item_review.destroy
      redirect_to item_path(@item)
    else
      redirect_to new_user_session_path
    end
  end

  private
  def item_review_params
      params.require(:item_review).permit(:rating, :comment)
  end
end
