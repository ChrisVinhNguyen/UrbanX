require 'rails_helper'

describe UserReview do
  context 'validations' do
    it 'is valid with valid attributes' do
      user_review = FactoryBot.create(:user_review)

      expect(user_review).to be_valid
    end

    it 'is not valid without a comment' do
      user_review = FactoryBot.build(:user_review, comment: nil)
      
      expect(user_review).to_not be_valid      
    end

    it 'is not valid without a rating' do
      user_review = FactoryBot.build(:user_review, rating: nil)
      
      expect(user_review).to_not be_valid  
    end

    it 'is not valid without a reviewee_id' do
      user_review = FactoryBot.build(:user_review, reviewee_id: nil)
      
      expect(user_review).to_not be_valid  
    end

    it 'is not valid without a reviewer_id' do
      user_review = FactoryBot.build(:user_review, reviewer_id: nil)
      
      expect(user_review).to_not be_valid  
    end

    it 'is not valid without a created_at' do 
      user_review = FactoryBot.build(:user_review, created_at: nil)

      expect(user_review).to_not be_valid
    end

    it 'is not valid without a updated_at' do 
      user_review = FactoryBot.build(:user_review, updated_at: nil)

      expect(user_review).to_not be_valid
    end
  end
  context 'associateions' do
    it {should belong_to(:reviewee)}
  end
end
