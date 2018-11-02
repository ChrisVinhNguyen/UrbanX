class ItemsController < ApplicationController
  def create
    if user_signed_in?

      @item = Item.new(item_params)
      @item.owner_id = @current_user.id
      if @item.save
          redirect_to @item
      else
        render :new
      end
    end
  end

  def new
    @item = Item.new
  end

  def index
    @item = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def edit
    if user_signed_in?
      @item = Item.find(params[:id])
    end
  end

  def update
    @item = Item.find(params[:id])

    if @item.update(item_params)
      redirect_to @item
    else
      render 'edit'
    end
  end

  def destroy
    if user_signed_in?
      @item = Item.find(params[:id])
      @item.destroy

      redirect_to items_path
    end
  end


private
  def item_params
      params.require(:item).permit(:name, :description, :category,  :quantity,  :condition, :value)
    end


end
