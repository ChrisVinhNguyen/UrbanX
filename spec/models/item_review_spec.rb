require 'rails_helper'

describe ItemReview do
  context 'validations' do
    it 'is valid with valid attributes' do
      item_review = FactoryBot.create(:item_review)

      expect(item_review).to be_valid
    end

    it 'is not valid without a comment' do
      item_review = FactoryBot.build(:item_review, comment: nil)
      
      expect(item_review).to_not be_valid      
    end

    it 'is not valid without a rating' do
      item_review = FactoryBot.build(:item_review, rating: nil)
      
      expect(item_review).to_not be_valid  
    end

    it 'is not valid without a owner_id' do
      item_review = FactoryBot.build(:item_review, owner_id: nil)
      
      expect(item_review).to_not be_valid  
    end

    it 'is not valid without a created_at' do 
      item_review = FactoryBot.build(:item_review, created_at: nil)

      expect(item_review).to_not be_valid
    end

    it 'is not valid without a updated_at' do 
      item_review = FactoryBot.build(:item_review, updated_at: nil)

      expect(item_review).to_not be_valid
    end
  end
  context 'associateions' do
    it {should belong_to(:item)}
  end
end
