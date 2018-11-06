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
        redirect_to item_path(@item)
      else
        render'new'
      end
    else
      render 'new'
    end
  end

  def new
    @item = Item.find(params[:item_id])
    @item_review = @item.item_reviews.new
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
  
  def edit
    @item = Item.find(params[:item_id])
    @item_review = @item.item_reviews.find(params[:id])
  end
  

  def item_review_params
      params.require(:item_review).permit(:rating, :comment)
  end
end
