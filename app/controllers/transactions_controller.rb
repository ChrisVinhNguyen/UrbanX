class TransactionsController < ApplicationController
  def new
    @transaction = Transaction.new
  end

  def create
    @transaction = Transaction.new(params.permit(:item_id ,:borrower_id, :lender_id, :status))
    @transaction.save
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
end
