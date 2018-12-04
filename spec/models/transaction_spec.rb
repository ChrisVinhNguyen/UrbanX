require 'rails_helper'

describe Transaction do
  context 'validations' do
    it 'is valid with valid attributes' do
      transaction = FactoryBot.create(:transaction)
      expect(transaction).to be_valid
    end
  

    it 'is not valid without a item_id' do
      transaction = FactoryBot.build(:transaction, item_id: nil)
      
      expect(transaction).to_not be_valid      
    end

    it 'is not valid without a borrower_id' do
      transaction = FactoryBot.build(:transaction, borrower_id: nil)
      
      expect(transaction).to_not be_valid  
    end

    it 'is not valid without a lender_id' do
      transaction = FactoryBot.build(:transaction, lender_id: nil)
      
      expect(transaction).to_not be_valid  
    end

    it 'is not valid without a lend_date' do
      transaction = FactoryBot.build(:transaction, lend_date: nil)
      
      expect(transaction).to_not be_valid  
    end

    it 'is not valid with a return_date' do
      transaction = FactoryBot.build(:transaction, return_date: nil)
      
      expect(transaction).to_not be_valid  
    end

    it 'is not valid without a expiry_date' do 
      transaction = FactoryBot.build(:transaction, expiry_date: nil)

      expect(transaction).to_not be_valid
    end
    it 'is not valid without a status' do 
      transaction = FactoryBot.build(:transaction, status: nil)

      expect(transaction).to_not be_valid
    end
    it 'is not valid without a created_at' do 
      transaction = FactoryBot.build(:transaction, created_at: nil)

      expect(transaction).to_not be_valid
    end
    it 'is not valid without a updated_at' do 
      transaction = FactoryBot.build(:transaction, updated_at: nil)

      expect(transaction).to_not be_valid
    end
    it 'is not valid without a item_name' do 
      transaction = FactoryBot.build(:transaction, item_name: nil)

      expect(transaction).to_not be_valid
    end
  end
  context 'associations' do
    it {should belong_to(:item)}
  end
end
