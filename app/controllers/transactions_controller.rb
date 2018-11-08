class TransactionsController < ApplicationController
  def new
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.new
    else
      redirect_to new_user_session_path
    end
  end

  def create
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.create(transaction_params)
      @transaction.lender_id = @current_user.id
      if @transaction.save
        redirect_to @item
      else
        render 'new'
      end
    else 
      redirect_to new_user_session_path
    end
  end

  def update
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.find(params[:id])
      @transaction.update(params)
    else
      redirect_to new_user_session_path
    end
  end

  def destroy
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.find(params[:id])
      @transaction.destroy
    else
      redirect_to new_user_session_path
    end
  end

  def index
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transactions = @item.transactions.all
    else 
      redirect_to new_user_session_path
    end
  end
  
  def show
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.find(params[:id])
    else 
      redirect_to new_user_session_path
    end
  end


  private
  def transaction_params
    params.require(:transaction).permit(:item_id, :borrower_id, :status)
  end
end
