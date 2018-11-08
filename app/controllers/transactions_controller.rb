class TransactionsController < ApplicationController
  def new
    @item = Item.find(params[:item_id])
    @transaction = @item.transactions.new
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
    end
  end

  def update
    @item = Item.find(params[:item_id])
    @transaction = @item.transactions.find(params[:id])
    @transaction.update(params)
  end

  def destroy
    @item = Item.find(params[:item_id])
    @transaction = @item.transactions.find(params[:id])
    @transaction.destroy
  end

  def index
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transactions = @item.transactions.all
    end
  end
  
  def show
    if user_signed_in?
      @item = Item.find(params[:item_id])
      @transaction = @item.transactions.find(params[:id])
    end
  end


  private
  def transaction_params
    params.require(:transaction).permit(:item_id, :borrower_id, :status)
  end
end
