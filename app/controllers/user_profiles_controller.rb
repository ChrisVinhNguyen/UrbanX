class UserProfilesController < ApplicationController
  def new
    @user_profile = UserProfile.new
  end

  def create
    @user_profile = UserProfile.new(params.permit(:first_name, :last_name))
    @user_profile.save
  end

  def update
    @user_profile = UserProfile.find(params[:id])
    @user_profile.update(params)
  end

  def destroy
    @user_profile = UserProfile.find(params[:id])
    @user_profile.destroy
  end

  def index
    @user_profiles = UserProfile.all
  end

  def show
    @user_profile = UserProfile.find(params[:id])
  end
end
