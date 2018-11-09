class UserProfilesController < ApplicationController
  def create
    if user_signed_in?

      @user_profile = UserProfile.new(user_profile_params)
      @user_profile.user_id = @current_user.id
      if @user_profile.save
          redirect_to @user_profile
      else
        render :new
      end
    end
  end

  def new
    @user_profile = UserProfile.new
  end

  def index
    @user_profiles = UserProfile.all
  end


  def edit
    if user_signed_in?
      @user_profile = UserProfile.find(params[:id])
    end
  end

  def update
    @user_profile = UserProfile.find(params[:id])

    if @user_profile.update(user_profile_params)
      redirect_to @user_profile
    else
      render 'edit'
    end
  end

  def destroy
    @user_profile = UserProfile.find(params[:id])
    @user_profile.destroy

    if user_signed_in?
      @user_profile = UserProfile.find(params[:id])
      @user_profile.destroy

      redirect_to user_profile
    end
  end

  def show
    @user_profile = UserProfile.find(params[:id])
  end

  def transactions
    if user_signed_in?
      @user_profile = UserProfile.find(params[:id])
      if @user_profile.user == @current_user
        @transactions = Transaction.where(:lender_id => @user_profile.user_id)
        .or(Transaction.where(:borrower_id => @user_profile.user_id))
      end
    else
      redirect_to new_user_session_path
    end
  end

  private
  def user_profile_params
      params.require(:user_profile).permit(:first_name, :last_name, :date_of_birth,  :location,  :contact_list)
  end

end
