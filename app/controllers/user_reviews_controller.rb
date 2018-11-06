class UserReviewsController < ApplicationController
  def create
    if user_signed_in?

      @user_review = UserReview.new(user_review_params)

      @item.user_id = @current_user.id
    
      if @item.save
          redirect_to @item
      else
        render :new
      end
    end
  end

  def new
    @item = Item.new
  end

  def index
    @item = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def edit
    if user_signed_in?
      @item = Item.find(params[:id])
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

private
  def user_review_params
      params.require(:user_review).permit(:rating, :comment)
    end


end
