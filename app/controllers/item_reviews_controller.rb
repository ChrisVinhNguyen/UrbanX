class ItemReviewsController < ApplicationController
  def new
    @item_review = ItemReview.new
  end

  def create
      @item = Item.find(params[:item_id])
      @item_review = @item.item_reviews.create(item_review_params)
      @item_review.created_at = DateTime.now
      @item_review.updated_at = DateTime.now 
      redirect_to item_path(@item)
  end

  def update
    @item_review = ItemReview.find(params[:id])
    @item_review.updated_at = DateTime.now
    @item_review.update(params)
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


private
  def item_review_params
      params.require(:item_review).permit(:rating, :comment)
    end
end
