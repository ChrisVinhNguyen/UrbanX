class UserReviewsController < ApplicationController
  def create
    if user_signed_in?
      @user_profile = UserProfile.find(params[:user_review][:reviewer_id])

      user_review_params = permit_user_review_params
      user_review_params[:rating] = user_review_params[:rating]
      user_review_params[:reviewer_id] = @current_user.id
      user_review_params[:reviewee_id] = @user_profile.id
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
    @reviewer_id = params[:reviewer_id]
    @user_review = UserReview.new
  end

  def index
    if user_signed_in?
      puts(params)
      @user_profile = UserProfile.find(params[:user_profile_id])
      @user_reviews = UserReview.where(:reviewee_id => @user_profile.user_id)
    else
      redirect_to new_user_session_path
    end
  end

  def show
    if user_signed_in?
      @user_profile = UserProfile.find(params[:user_profile_id])
      @user_reviews = UserReview.where(:reviewer_id => @user_profile.user_id)
    else
      redirect_to new_user_session_path
    end
  end

  def update
    if user_signed_in?
      @user_profile = UserProfile.find(params[:user_profile_id])
      @user_review = @user_profile.user_reviews.find(params[:id])
      #check if current user is allowed to edit
      if @user_review.reviewer_id == @current_user.id
        if @user_review.update(user_review_params)
          puts("saved")
          @user_review.updated_at = DateTime.now
          redirect_to @user_profile
        else
          puts("nots saved")
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
      @user_profile = UserProfile.find(params[:user_profile_id])
      @user_review = @user_profile.user_reviews.find(params[:id])
    else 
      redirect_to new_user_session_path
    end
  end

  def destroy
    if user_signed_in?
      @user_profile = UserProfile.find(params[:user_profile_id])
      @user_review = @user_profile.user_reviews.find(params[:id])
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
