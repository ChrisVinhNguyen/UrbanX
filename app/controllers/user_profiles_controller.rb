class UserProfilesController < ApplicationController
   protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def create
    if user_signed_in?
      context_params = {
        user_profile_params: user_profile_params,
        current_user: current_user
      }

      result = CreateNewUserProfile.call(context_params)

      if result.success?
        render json: result.profile_info_hash
      end
    else
      render :new
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
    # puts params
    if @user_profile.update(user_profile_params)
      render :json => {"saved_successfull" => true}
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
    # gets used inside erb files
    # @user_profile = UserProfile.find(params[:id])
    # @user_reviews = UserReview.where(reviewee_id: @user_profile.user_id)

    context_params = {
      profile_id: params[:id]
    }

    result = GetUserProfileInformation.call(context_params)

    if result.success?
      if result.user_profile.image.attached?
        result.profile_info_hash[:image] = url_for(result.user_profile.image)
        result.profile_info_hash[:image_attachment_id] = result.user_profile.image.id
      end
      render json: result.profile_info_hash
    end
  end

  def transactions

    if user_signed_in?
      @user_profile = UserProfile.find(params[:id])
      if @user_profile.user == @current_user
        if params[:cur_status] == 'All'
          filtered_transactions = Transaction.where(:lender_id => @user_profile.user_id)
        .or(Transaction.where(:borrower_id => @user_profile.user_id))
        else
          if params[:cur_status] == 'overdue'
            filtered_transactions = Transaction.where("status = ? AND expiry_date < ? AND (lender_id = ? OR borrower_id = ?)", 
              'lent', DateTime.now, @user_profile.user_id, @user_profile.user_id)
          else
            filtered_transactions = Transaction.where("status = ? AND (lender_id = ? OR borrower_id = ?)", 
              params[:cur_status], @user_profile.user_id, @user_profile.user_id)
          end
        end

        transactions_array = []

        filtered_transactions.each do |transaction|
          transaction_hash = transaction.attributes
          if Item.exists?(id: transaction.item_id)
            transaction_hash[:item_name] = Item.find(transaction.item_id).name
          else
            transaction_hash[:item_name] = transaction.item_name
          end
          transaction_hash[:lender_name] = UserProfile.where(user_id:transaction.lender_id).first.first_name + ' ' +
                                            UserProfile.where(user_id:transaction.lender_id).first.last_name
          transaction_hash[:borrower_name] = UserProfile.where(user_id:transaction.borrower_id).first.first_name + ' ' +
                                            UserProfile.where(user_id:transaction.borrower_id).first.last_name

          transactions_array.push(transaction_hash)
        end

        render :json => {"filtered_transactions" => transactions_array}.to_json()
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

  def delete_image
    @image = ActiveStorage::Attachment.find(params[:id])
    @image.purge_later
    # redirect_back(fallback_location: items_path)
  end


  def my_transactions_for_item

    if user_signed_in?
      @user_profile = UserProfile.find(params[:id])
      if @user_profile.user == @current_user
        my_transactions_for_current_item = Transaction.where("status != ? AND (lender_id = ? OR borrower_id = ?) AND item_id = ?", 
          'completed', @user_profile.user_id, @user_profile.user_id, params[:current_item_id])

        transactions_array = []

        my_transactions_for_current_item.each do |transaction|
          transaction_hash = transaction.attributes

          transactions_array.push(transaction_hash)
        end

        render :json => {"my_transactions_for_current_item" => transactions_array}.to_json()
      end
    else
      redirect_to new_user_session_path
    end
  end



  private
  def user_profile_params
    params.require(:user_profile).permit(:first_name, :last_name, :date_of_birth,  :location,  :contact_list, :image)
  end
end
