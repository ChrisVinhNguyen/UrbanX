class TransactionsController < ApplicationController
  def new
    if user_signed_in?
      @item = Item.find(params[:item_id])
      if @item.status == 'available' && @item.user != @current_user
        @transaction = @item.transactions.new
      else
        redirect_to @item
      end
    else
      redirect_to new_user_session_path
    end
  end

  def create
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.create(transaction_params)
      @transaction.lender = @item.user
      @transaction.borrower = @current_user
      if @transaction.save
        @item.update({:status => "unavailable"})
        redirect_to @item
      else
        render 'new'
      end
    else 
      redirect_to new_user_session_path
    end
  end

  def edit
    if user_signed_in?
      @item = Item.find(params[:item_id])
      if @item.user == @current_user && @item.transactions.find(params[:id]).status != 'completed'
        @transaction = @item.transactions.find(params[:id])
      else
        redirect_to @item
      end
    else
      redirect_to new_user_session_path
    end
  end

  def update
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.find(params[:id])
      if @transaction.update(transaction_params)
        if params[:transaction][:status] == 'completed'
          @item.update({:status => 'available'})
        end
        redirect_to item_transaction_url
      else
        render 'edit'
      end
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
      if @item.user == @current_user
        @transactions = @item.transactions.all
      end
    else 
      redirect_to new_user_session_path
    end
  end
  
  def show
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.find(params[:id])
      if @transaction.lender != @current_user && @transaction.borrower != @current_user
        @transaction = nil
      end
    else 
      redirect_to new_user_session_path
    end
  end


  private
  def transaction_params
    params.require(:transaction).permit(:status)
  end
end
