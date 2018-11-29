require 'rails_helper'

describe UserProfile do
  context 'validations' do
    it 'is valid with valid attributes' do
      user_profile = FactoryBot.create(:user_profile)

      expect(user_profile).to be_valid
    end

    it 'is not valid without a first_name' do
      user_profile = FactoryBot.build(:user_profile, first_name: nil)
      
      expect(user_profile).to_not be_valid      
    end

    it 'is not valid without a last_name' do
      user_profile = FactoryBot.build(:user_profile, last_name: nil)
      
      expect(user_profile).to_not be_valid  
    end

    it 'is not valid without a date_of_birth' do
      user_profile = FactoryBot.build(:user_profile, date_of_birth: nil)
      
      expect(user_profile).to_not be_valid  
    end

    it 'is not valid without a location' do
      user_profile = FactoryBot.build(:user_profile, location: nil)
      
      expect(user_profile).to_not be_valid  
    end

    it 'is not valid with a created_at' do
      user_profile = FactoryBot.build(:user_profile, created_at: nil)
      
      expect(user_profile).to_not be_valid  
    end

    it 'is not valid without a updated_at' do 
      user_profile = FactoryBot.build(:user_profile, updated_at: nil)

      expect(user_profile).to_not be_valid
    end
  end
  context 'associations' do
    it {should belong_to(:user)}
  end
end
