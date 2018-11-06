class TransactionsController < ApplicationController
  def new
    @transaction = Transaction.new
  end

  def create
    if user_signed_in?
      @transaction = Transaction.new(transaction_params)
      @transaction.lender_id = @current_user.id
      @transaction.item_id = params[:item_id]
      if @transaction.save
        redirect_to @transaction
      else
        render 'new'
      end
    end
  end

  def update
    @transaction = Transaction.find(params[:id])
    @transaction.update(params)
  end

  def destroy
    @transaction = Transaction.find(params[:id])
    @transaction.destroy
  end

  def index
    if user_signed_in?
      @transactions = Transaction.where(lender_id: @current_user.id).
      or(Transaction.where(borrower_id: @current_user.id))
    end
  end
  
  def show
    if user_signed_in?
      @transaction = Transaction.where(id: params[:id], lender_id: @current_user.id).
      or(Transaction.where(id: params[:id], borrower_id: @current_user.id)).first
    end
  end


  private
  def transaction_params
    params.require(:transaction).permit(:borrower_id, :status)
  end
end
