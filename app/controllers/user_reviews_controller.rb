class UserReviewsController < ApplicationController
  def new
    @user_review = UserReview.new
  end

  def create
    @user_review = UserReview.new(params.permit(:user:id, :rating))
    @user_review.save
  end

  def update
    @user_review = UserReview.find(params[:id])
    @user_review.update(params)
  end

  def destroy
    @user_review = UserReview.find(params[:id])
    @user_review.destroy
  end

  def index
    @user_reviews = UserReview.all
  end
  
  def show
    @user_review = UserReview.find(params[:id])
  end
end
