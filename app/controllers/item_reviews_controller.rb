class ItemReviewsController < ApplicationController
  def new
    @item_review = ItemReview.new
  end

  def create
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @item_review = @item.item_reviews.create(item_review_params)
      @item_review.created_at = DateTime.now
      @item_review.updated_at = DateTime.now 
      #map the user who created the review for this item       
      @item_review.owner_id = @current_user.id
      if @item_review.save
        puts("saved successfully")
      end
      redirect_to item_path(@item)
    end
  end

  def update
    @item = Item.find(params[:item_id])
    @item_review = @item.item_reviews.find(params[:id])
    #check if current user is allowed to edit
    if @item_review.owner_id == @current_user.id
      @item_review.updated_at = DateTime.now
      @item_review.update(params)
    else
      redirect_to @item
    end
  end

  def destroy
    @item = Item.find(params[:item_id])
    @item_review = ItemReview.find(params[:id])
    @item_review.destroy
    redirect_to item_path(@item)
  end

  def index
  end
  
  def show
  end
  


  

  def item_review_params
      params.require(:item_review).permit(:rating, :comment)
  end
end
