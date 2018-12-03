require 'rails_helper'

describe UpdateItem do
  before do
    @item = FactoryBot.create(:item)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        item_id: @item.id,
        item_params: {
          name: "updated name"
        }
      }

      result = UpdateItem.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no item_id' do
      context_params = {
        item_params: {}
      }

      result = UpdateItem.call({})

      expect(result).to be_a_failure
    end

    it 'is invalid with no item_params' do
      context_params = {
        item_id: @item.id
      }
      result = UpdateItem.call({})

      expect(result).to be_a_failure
    end
  end

  context 'call' do
    it 'calls methods with params' do
      context_params = {
        item_id: @item.id,
        item_params: {
          name: "updated name"
        }
      }

      item_repo = double
      item = double

      expect(ItemRepository).to receive(:new).and_return(item_repo)
      expect(item_repo).to receive(:find_by_id).with(context_params[:item_id]).and_return(item)
      expect(item_repo).to receive(:update).with(item, context_params[:item_params])

      result = UpdateItem.call(context_params)
    end

    it 'update item success with valid item_params' do
      context_params = {
        item_id: @item.id,
        item_params: {
          name: "updated name",
          description: "new description"
        }
      }

      result = UpdateItem.call(context_params)

      expect(result.item[:name]).to eq(context_params[:item_params][:name])
      expect(result.item[:description]).to eq(context_params[:item_params][:description])
    end

    it 'update item fails with invalid item_id that does not exist' do
      context_params = {
        item_id: @item.id + 1,
        item_params: {
          name: "updated name",
          description: "new description"
        }
      }

      item_repo = double
      item = double

      expect(ItemRepository).to receive(:new).and_return(item_repo)
      expect(item_repo).to receive(:find_by_id).with(context_params[:item_id]).and_return("Couldn't find Item with 'id'=${context_params[:item_id] + 1}")
      expect(item_repo).not_to receive(:update).with(item, context_params[:item_params])

      result = UpdateItem.call(context_params)
    end

    it 'update item fail with invalid item_params quantity' do
      context_params = {
        item_id: @item.id,
        item_params: {
          quantity: "hello"
        }
      }

      result = UpdateItem.call(context_params)

      expect(result.item[:quantity]).not_to eq(context_params[:item_params][:quantity])
    end

    it 'update item fail with invalid item_params value' do
      context_params = {
        item_id: @item.id,
        item_params: {
          value: "hello"
        }
      }

      result = UpdateItem.call(context_params)

      expect(result.item[:value]).not_to eq(context_params[:item_params][:value])
    end
  end
end
