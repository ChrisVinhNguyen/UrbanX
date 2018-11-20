require 'rails_helper'

describe Item do
  context 'validations' do
    it 'is valid with valid attributes' do
      item = FactoryBot.create(:item)

      expect(item).to be_valid
    end

    it 'is not valid without a name' do
      item = FactoryBot.build(:item, name: nil)
      
      expect(item).to_not be_valid      
    end

    it 'is not valid without a description' do
      item = FactoryBot.build(:item, description: nil)
      
      expect(item).to_not be_valid  
    end

    it 'is not valid without a category' do
      item = FactoryBot.build(:item, category: nil)
      
      expect(item).to_not be_valid  
    end

    it 'is not valid without a quantity' do
      item = FactoryBot.build(:item, quantity: nil)
      
      expect(item).to_not be_valid  
    end

    it 'is not valid with a quantity less than 1' do
      item = FactoryBot.build(:item, quantity: 0)
      
      expect(item).to_not be_valid  
    end

    it 'is not valid without a condition' do 
      item = FactoryBot.build(:item, condition: nil)

      expect(item).to_not be_valid
    end

    it 'is not valid without a date_posted' do 
      item = FactoryBot.build(:item, date_posted: nil)

      expect(item).to_not be_valid
    end

    it 'is not valid without a value' do 
      item = FactoryBot.build(:item, value: nil)

      expect(item).to_not be_valid
    end

    it 'is not valid with a value less than 0' do 
      item = FactoryBot.build(:item, value: -10)

      expect(item).to_not be_valid
    end

    it 'is not valid without a user_id' do 
      item = FactoryBot.build(:item, user_id: nil)

      expect(item).to_not be_valid
    end

    it 'is not valid without a status' do 
      item = FactoryBot.build(:item, status: nil)

      expect(item).to_not be_valid
    end
  end
  context 'associations' do
    it {should belong_to(:user)}
  end
end
