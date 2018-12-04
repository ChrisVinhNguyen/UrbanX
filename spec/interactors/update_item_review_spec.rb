require 'rails_helper'

describe UpdateItemReview do
  before do
    @item_review = FactoryBot.create(:item_review)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        item_id: @item_review.item.id,
        item_review_id: @item_review.id,
        item_review_params: {
          rating: @item_review.rating,
          comment: @item_review.comment
        }
      }

      result = EditItemReview.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no item_review_id' do
      context_params = {
        item_id: @item_review.item.id,
        item_review_params: {
          rating: @item_review.rating,
          comment: @item_review.comment
        }
      }

      result = EditItemReview.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no item_review_params' do
      context_params = {
        item_id: @item_review.item.id,
        item_review_id: @item_review.id
      }

      result = EditItemReview.call(context_params)
      expect(result).to be_a_failure
    end
  end

  context 'call' do
    it 'calls methods successfully with params' do
      original_updated_at = @item_review.updated_at
      context_params = {
        item: @item_review.item,
        item_review_id: @item_review.id,
        item_review_params: {
          rating: 5.0,
          comment: "test comment"
        }
      }

      result = UpdateItemReview.call(context_params)

      expect(result.item_review.rating).to eq(context_params[:item_review_params][:rating])
      expect(result.item_review.comment).to eq(context_params[:item_review_params][:comment])
      expect(result.item_review.updated_at).not_to eq(original_updated_at)
    end

    # item_review_repo = ItemReviewRepository.new
    #   item_review = item_review_repo.find_by_id(context.item, context.item_review_id)
    #   item_review_repo.update(item_review, context.item_review_params)
    #   item_review.updated_at = DateTime.now.to_formatted_s(:db)

    it 'calls methods successfully with params' do
      context_params = {
        item: @item_review.item,
        item_review_id: @item_review.id,
        item_review_params: {
          rating: 5.0,
          comment: "test comment"
        }
      }

      # item_review_repo = double
      # item_review = double

      # expect(ItemReviewRepository).to receive(:new).and_return(item_review_repo)
      # expect(item_review_repo).to receive(:find_by_id).with(context_params[:item], context_params[:item_review_id]).and_return(item_review)
      # expect(item_review_repo).to receive(:update).with(item_review, context_params[:item_review_params])

      item_review_repo = ItemReviewRepository.new

      expect(ItemReviewRepository).to receive(:new).and_return(item_review_repo)
      expect(item_review_repo).to receive(:find_by_id).with(context_params[:item], context_params[:item_review_id]).and_return(@item_review)
      expect(item_review_repo).to receive(:update).with(@item_review, context_params[:item_review_params])
      expect(DateTime).to receive(:now)

      result = UpdateItemReview.call(context_params)

      expect(result).to be_a_success
    end

  #   it 'update item success with valid item_params' do
  #     context_params = {
  #       item_id: @item.id,
  #       item_params: {
  #         name: "updated name",
  #         description: "new description"
  #       }
  #     }

  #     result = UpdateItem.call(context_params)

  #     expect(result.item[:name]).to eq(context_params[:item_params][:name])
  #     expect(result.item[:description]).to eq(context_params[:item_params][:description])
  #   end

  #   it 'update item fails with invalid item_id that does not exist' do
  #     context_params = {
  #       item_id: @item.id + 1,
  #       item_params: {
  #         name: "updated name",
  #         description: "new description"
  #       }
  #     }

  #     item_repo = double
  #     item = double

  #     expect(ItemRepository).to receive(:new).and_return(item_repo)
  #     expect(item_repo).to receive(:find_by_id).with(context_params[:item_id]).and_return("Couldn't find Item with 'id'=${context_params[:item_id] + 1}")
  #     expect(item_repo).not_to receive(:update).with(item, context_params[:item_params])

  #     result = UpdateItem.call(context_params)
  #   end

  #   it 'update item fail with invalid item_params quantity' do
  #     context_params = {
  #       item_id: @item.id,
  #       item_params: {
  #         quantity: "hello"
  #       }
  #     }

  #     result = UpdateItem.call(context_params)

  #     expect(result.item[:quantity]).not_to eq(context_params[:item_params][:quantity])
  #   end

  #   it 'update item fail with invalid item_params value' do
  #     context_params = {
  #       item_id: @item.id,
  #       item_params: {
  #         value: "hello"
  #       }
  #     }

  #     result = UpdateItem.call(context_params)

  #     expect(result.item[:value]).not_to eq(context_params[:item_params][:value])
  #   end
  end
end
