require 'rails_helper'

describe CreateNewUserProfile do
  before do
    @user_profile = FactoryBot.create(:user_profile)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        user_profile_params: {
          first_name: @user_profile.first_name,
          last_name: @user_profile.last_name,
          date_of_birth: @user_profile.date_of_birth,
          location: @user_profile.location
        }
      }

      result = CreateNewUserProfile.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no params' do
      context_params = {
      }

      result = CreateNewUserProfile.call(context_params)

      expect(result).to be_a_failure
    end

  context 'call' do
    it 'add user_profile success with valid user_profile_params' do
      context_params = {
        user_profile_params: {
          first_name: "FirstName",
          last_name: "LastName",
          date_of_birth: "2017-10-15",
          location: "Location"
        }
      }

      result = CreateNewUserProfile.call(context_params)

      expect(result.user_profile.first_name).to eq(context_params[:user_profile_params][:first_name])
      expect(result.user_profile.last_name).to eq(context_params[:user_profile_params][:last_name])
      expect(result.user_profile.date_of_birth).to eq(context_params[:user_profile_params][:date_of_birth])
      expect(result.user_profile.location).to eq(context_params[:user_profile_params][:location])
    end
   end
 end
end
