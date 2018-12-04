require 'rails_helper'

describe FindUserProfile do
  before do
    @user_profile = FactoryBot.create(:user_profile)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        profile_id: @user_profile.id
      }

      result = FindUserProfile.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no params' do
      context_params = {
      }

      result = FindUserProfile.call(context_params)

      expect(result).to be_a_failure
    end

  
    it 'find_item success with valid find_user_profile_params' do
      context_params = {
        profile_id: @user_profile.id
      }

      result = FindUserProfile.call(context_params)


      expect(result.user_profile.id).to eq(@user_profile.id)
      expect(result.user_profile.contact_list).to eq(@user_profile.contact_list)
      expect(result.user_profile.date_of_birth).to eq(@user_profile.date_of_birth)
      expect(result.user_profile.first_name).to eq(@user_profile.first_name)
      expect(result.user_profile.last_name).to eq(@user_profile.last_name)
      expect(result.user_profile.points).to eq(@user_profile.points)
      expect(result.user_profile.created_at).to eq(@user_profile.created_at)
      expect(result.user_profile.updated_at).to eq(@user_profile.updated_at)
      expect(result.user_profile.user_id).to eq(@user_profile.user_id)
    end
   
  end
end