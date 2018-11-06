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
    @transactions = Transaction.all
  end
  
  def show
    @transaction = Transaction.find(params[:id])
  end


  private
  def transaction_params
    params.require(:transaction).permit(:borrower_id, :status)
  end
end
