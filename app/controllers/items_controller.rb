class ItemsController < ApplicationController
  def new
    @item = Item.new
  end

  def create
    @item = Item.new(params.permit(:name ,:category, :quantity, :data_posted, :owner_id, :status))
    @item.save
  end

  def update
    @item = Item.find(params[:id])
    @item.update(params)
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
  end

  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end
end
