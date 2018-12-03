require 'rails_helper'

describe CreateUserProfileInfoHash do
  before do
    @user_profile = FactoryBot.create(:user_profile)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        user_profile: @user_profile,
        contact_list: [{ 1 => "name 1" }, { 2 => "name 2" }]
      }

      result = CreateUserProfileInfoHash.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no user_profile' do
      context_params = {
        contact_list: [{ 1 => "name 1" }, { 2 => "name 2" }]
      }

      result = CreateUserProfileInfoHash.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no contact_list' do
      context_params = {
        user_profile: @user_profile,
      }
      result = CreateUserProfileInfoHash.call(context_params)

      expect(result).to be_a_failure
    end
  end

  context 'call' do
    it 'update item success with valid item_params' do
      context_params = {
        user_profile: @user_profile,
        contact_list: [{ 1 => "name 1" }, { 2 => "name 2" }]
      }

      expected_profile_info_hash = @user_profile.attributes
      expected_profile_info_hash[:contact_list] = context_params[:contact_list]
      expected_profile_info_hash[:email] = context_params[:user_profile].user.email

      result = CreateUserProfileInfoHash.call(context_params)

      expect(result.profile_info_hash).to eq(expected_profile_info_hash)
    end
  end
end
