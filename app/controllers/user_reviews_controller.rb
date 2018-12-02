class UserReviewsController < ApplicationController
  def create
    if user_signed_in?
      @reviewee = UserProfile.find(params[:reviewee_id])
      puts(params)
      @user_review = @reviewee.user_reviews.create(
        rating: params[:user_review][:rating],
        comment: params[:user_review][:comment],
        created_at: DateTime.now,
        updated_at: DateTime.now,
        reviewer_id: params[:reviewer_id],
        reviewee_id: params[:reviewee_id]
        )

      puts(@current_user.id)
      puts(@user_review.errors.full_messages)

      '''
      @user_review.created_at = DateTime.now
      @user_review.updated_at = DateTime.now
      @user_review.reviewer_id = @current_user.id
      @user_review.reviewee_id = @reviewee.id


      @user_profile = UserProfile.find_by user_id: (params[:user_review][:reviewee_id])
      user_review_params = permit_user_review_params
      user_review_params[:rating] = user_review_params[:rating]
      user_review_params[:reviewer_id] = @current_user.id
      user_review_params[:reviewee_id] = @user_profile.user_id
      user_review_params[:created_at] = DateTime.now
      user_review_params[:updated_at] = DateTime.now
      @user_review = UserReview.new(user_review_params)
      '''
      if @user_review.save
        render :json => {"success" => true}.to_json()
      else
        puts("failed to create new user review")
      end
    else
      redirect_to new_user_session_path
    end
  end

  def new
    @reviewee = UserProfile.find(params[:user_profile_id])
    puts(params)
    @user_review = @reviewee.user_reviews.new(reviewee_id: params[:user_profile_id])

    
    '''
    @reviewee_id = params[:reviewee_id]
    @user_review = UserReview.new'''
  end

  def index
    @reviewee = UserProfile.find(params[:user_profile_id])
    @user_reviews = UserReview.where(reviewee_id: params[:user_profile_id])

    user_reviews_array = []
    @user_reviews.each do |user_review| 
      user = User.find(user_review[:reviewer_id])
      full_name = user.user_profile[:first_name] + " " + user.user_profile[:last_name]
      user_review_hash = user_review.attributes
      user_review_hash[:reviewer] = full_name
      user_reviews_array.push(user_review_hash)
    end
    render :json => {"user_reviews" => user_reviews_array}.to_json()
  end

  def show
  end

  def update
    if user_signed_in?
      @reviewee = UserProfile.find(params[:user_profile_id])
      @user_review = @reviewee.user_reviews.find(params[:id])
      #check if current user is allowed to edit
      if @user_review.reviewer_id == @current_user.id
        if @user_review.update(
          rating: params[:user_review][:rating],
          comment: params[:user_review][:comment],
          updated_at: DateTime.now,
          )

          puts("saved")
          render :json => {"success" => true}.to_json()
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

    '''
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
    end'''
  end

  def edit
    if user_signed_in?
      @reviewee = UserProfile.find(params[:user_profile_id])
      @user_review = @reviewee.user_reviews.find(params[:id])
    else
      redirect_to new_user_session_path
    end

    '''
    if user_signed_in?
      @reviewee_id = params[:reviewee_id]
      @user_review = UserReview.find(params[:id])
    else 
      redirect_to new_user_session_path
    end '''
  end

  def destroy
    if user_signed_in?
      @reviewee = UserProfile.find(params[:user_profile_id])
      @user_review = @reviewee.user_reviews.find(params[:id])
      @user_review.destroy
      render :json => {"success" => true}.to_json()
    else
      redirect_to new_user_session_path
    end
    '''if user_signed_in?
      @user_review = UserReview.find(params[:id])
      @user_profile = UserProfile.find_by user_id: @user_review.reviewee_id
      @user_review.destroy
      render :json => {"success" => true}.to_json()
    else
      redirect_to new_user_session_path
    end'''
  end

  private
  def user_review_params
    params.require(:user_review).permit(:rating, :comment)
  end
end
