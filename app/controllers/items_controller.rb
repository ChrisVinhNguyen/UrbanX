class ItemsController < ApplicationController
  def new
    @item = Item.new
  end

  def create
    @item = Item.new(params.permit(:name ,:category, :quantity, :data_posted, :owner_id, :status, :condition))
    @item.save
  end

  def update
    @item = Item.find(params[:id])
    @item.update(params)
  end



