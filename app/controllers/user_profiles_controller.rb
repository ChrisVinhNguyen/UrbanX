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
    @user_reviews = UserReview.where(reviewee_id: @user_profile.user_id)
    @contact_names = []
    @user_profile.contact_list.each do |contact_id|
      contact_profile = UserProfile.find(contact_id)
      @contact_names.insert(contact_id.to_i,contact_profile.first_name + " " + contact_profile.last_name)
    end
    profile_hash = @user_profile.attributes
    profile_hash[:contact_list] = @contact_names
    profile_hash[:email] = @user_profile.user.email
    render json: profile_hash
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

  def new_contact
    if user_signed_in?
      @user_profile = UserProfile.find(params[:id])
      if @user_profile.user == @current_user
        @user_profiles = UserProfile.all
      end
    else
      redirect_to new_user_session_path
    end
  end
  
  def add_contact
    @contact = UserProfile.find(params[:contact_id])
    @user_profile = UserProfile.find(params[:id])
    @user_profile.contact_list.push(params[:contact_id])
    @user_profile.save
  end

  def remove_contact
    @contact = UserProfile.find(params[:contact_id])
    @user_profile = UserProfile.find(params[:id])
    @user_profile.contact_list.delete(params[:contact_id])
    @user_profile.save
  end

  def transactions_requests
    if user_signed_in?
      @user_profile = UserProfile.find(params[:id])
      if @user_profile.user == @current_user
        @transactions = Transaction.where(:lender_id => @user_profile.user_id)
        .or(Transaction.where(:borrower_id => @user_profile.user_id))
        @transactions = @transactions.where(:status => 'pending')
      end
    else
      redirect_to new_user_session_path
    end
  end

  def delete_image_attachment
    @user_profile = UserProfile.find(params[:user_profile_id])
    @image = @user_profile.image
    @image.purge_later
    redirect_to @user_profile
  end



  private
  def user_profile_params
    params.require(:user_profile).permit(:first_name, :last_name, :date_of_birth,  :location,  :contact_list, :image)
  end
end
