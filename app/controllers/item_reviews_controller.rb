class ItemReviewsController < ApplicationController
  def new
    @item_review = ItemReview.new
  end

  def create
    @item_review = ItemReview.new(params.permit(:user_id, :rating))
    @item_review.save
  end

  def update
    @item_review = ItemReview.find(params[:id])
    @item_review.update(params)
  end

  def destroy
    @item_review = ItemReview.find(params[:id])
    @item_review.destroy
  end

  def index
    @item_reviews = ItemReview.all
  end
  
  def show
    @item_review = ItemReview.find(params[:id])
  end
end
