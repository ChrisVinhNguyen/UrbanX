require 'rails_helper'

describe GetUserInfo do
  before do
    @user_profile = FactoryBot.create(:user_profile)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        current_user: @user_profile.user
      }

      result = GetUserInfo.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no params' do
      context_params = {
      }

      result = GetUserInfo.call(context_params)

      expect(result).to be_a_failure
    end

  context 'call' do
    it 'add user_profile success with valid user_profile_params' do
      context_params = {
        current_user: @user_profile.user
      }

      result = GetUserInfo.call(context_params)

      expect(result.user_info["user_id"]).to eq(@user_profile.user.id)
      expect(result.user_info["email"]).to eq(@user_profile.user.email)
      expect(result.user_info["user_profile_id"]).to eq(@user_profile.id)
      expect(result.user_info["first_name"]).to eq(@user_profile.first_name)
      expect(result.user_info["last_name"]).to eq(@user_profile.last_name)
      expect(result.user_info["date_of_birth"]).to eq(@user_profile.date_of_birth)
      expect(result.user_info["location"]).to eq(@user_profile.location)
      expect(result.user_info["contact_list"]).to eq(@user_profile.contact_list)
    end
   end
 end
end
