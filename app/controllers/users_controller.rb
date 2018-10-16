class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(params.permit(:first_name, :email, :password, :last_name))
    @user.save
  end

  def update
    @user = User.find(params[:id])
    @user.update(params)
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end
end
