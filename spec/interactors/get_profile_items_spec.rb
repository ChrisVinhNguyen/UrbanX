require 'rails_helper'

describe GetProfileItems do
  before do
    @user_profile = FactoryBot.create(:user_profile)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        profile_id: @user_profile.id
      }

      result = GetProfileItems.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no params' do
      context_params = {
      }

      result = GetProfileItems.call(context_params)

      expect(result).to be_a_failure
    end

  context 'call' do
    it 'add user_profile success with valid user_profile_params' do
      context_params = {
        profile_id: @user_profile.id
      }

      result = GetProfileItems.call(context_params)

      expect(result.items).to eq(@user_profile.user.items)
    end
   end
 end
end
