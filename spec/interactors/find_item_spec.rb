require 'rails_helper'

describe FindItem do
  before do
    @item = FactoryBot.create(:item)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        item_id: @item.id
      }

      result = FindItem.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no params' do
      context_params = {
      }

      result = FindItem.call(context_params)

      expect(result).to be_a_failure
    end

  
    it 'find_item success with valid find_item_params' do
      context_params = {
        item_id: @item.id
      }

      result = FindItem.call(context_params)

      expect(result.item.id).to eq(@item.id)
      expect(result.item.category).to eq(@item.category)
      expect(result.item.condition).to eq(@item.condition)
      expect(result.item.date_posted).to eq(@item.date_posted)
      expect(result.item.description).to eq(@item.description)
      expect(result.item.name).to eq(@item.name)
      expect(result.item.status).to eq(@item.status)
      expect(result.item.value).to eq(@item.value)
      expect(result.item.user_id).to eq(@item.user_id)
    end
   
  end
end