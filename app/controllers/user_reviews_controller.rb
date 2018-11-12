class UserReviewsController < ApplicationController
  def create
    if user_signed_in?
      @user_profile = UserProfile.find_by user_id: (params[:user_review][:reviewee_id])

      user_review_params = permit_user_review_params
      user_review_params[:rating] = user_review_params[:rating]
      user_review_params[:reviewer_id] = @current_user.id
      user_review_params[:reviewee_id] = @user_profile.user_id
      user_review_params[:created_at] = DateTime.now
      user_review_params[:updated_at] = DateTime.now

      @user_review = UserReview.new(user_review_params)

      if @user_review.save
        redirect_to @user_profile
      else
        render 'new'
      end
    else
      redirect_to new_user_session_path
    end
  end

  def new
    @reviewee_id = params[:reviewee_id]
    @user_review = UserReview.new
  end

  def index
  end

  def show
  end

  def update
    if user_signed_in?
      @user_review = UserReview.find(params[:id])
      @user_profile = UserProfile.find_by user_id: @user_review.reviewee_id
      #check if current user is allowed to edit
      if @user_review.reviewer_id == @current_user.id
        if @user_review.update(permit_user_review_params)
          puts("saved")
          @user_review.updated_at = DateTime.now
          redirect_to @user_profile
        else
          puts("nots saved")
          redirect_to @user_profile
        end
      else
          puts(@user_review.comment)
          puts(@current_user.id)
      end
    else
      redirect_to @user_profile
    end
  end

  def edit
    if user_signed_in?
      @reviewee_id = params[:reviewee_id]
      @user_review = UserReview.find(params[:id])
    else 
      redirect_to new_user_session_path
    end
  end

  def destroy
    if user_signed_in?
      @user_review = UserReview.find(params[:id])
      @user_profile = UserProfile.find_by user_id: @user_review.reviewee_id
      @user_review.destroy
      redirect_to @user_profile
    else
      redirect_to new_user_session_path
    end
  end

  private
  def permit_user_review_params
    params.require(:user_review).permit(:rating, :comment)
  end
end
