class ItemsController < ApplicationController


  def create
    if user_signed_in?

      @item = Item.new(item_params)

      @item.user_id = @current_user.id
    
      if @item.save
          redirect_to @item
      else
        render :new
      end
    else
        redirect_to new_user_session_path
    end
  end

  def new
    @item = Item.new
  end

  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def edit
    if user_signed_in?
      @item = Item.find(params[:id])
      if @item.user_id != @current_user.id
        redirect_to items_path
      end
    end
  end

  def update
    if user_signed_in?
      @item = Item.find(params[:id])
      if @item.user_id = @current_user.id

        if @item.update(item_params)
          redirect_to @item
        else
          render 'edit'
        end
      end
    else
        redirect_to new_user_session_path
    end

  end

  def destroy
    if user_signed_in?
      @item = Item.find(params[:id])
      if @item.user_id = @current_user.id
        @item.destroy

        redirect_to items_path
      end
    end
  end

private
  def item_params
      params.require(:item).permit(:name, :description, :category,  :quantity,  :condition, :value, :user_id)
    end


end
