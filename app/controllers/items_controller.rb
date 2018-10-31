class ItemsController < ApplicationController
  def new
    @item = Item.new
  end

  def create
    @item = Item.new(params[:item])

    @item.save
    redirect_to @item
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

private
  def item_params
      params.require(:item).permit(:owner_id, :name)
        # ,:category, :quantity, :data_posted, :owner_id, :status, :condition, :value, :description)
  end
end
