require 'rails_helper'

describe DestroyItemReview do
  before do
    @item_review = FactoryBot.create(:item_review)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        item: @item_review.item,
        item_review_id: @item_review.id
      }

      result = DestroyItemReview.call(context_params)

      expect(result).to be_a_success
    end
  end

    it 'is invalid with no item' do
      context_params = {
        item_review_id: @item_review.id
      }

      result = UpdateItem.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no item_review_id' do
      context_params = {
        item: @item_review.item
      }
      result = UpdateItem.call(context_params)

      expect(result).to be_a_failure
    end
  

    it 'calls methods successfully with params' do
        context_params = {
          item: @item_review.item,
          item_review_id: @item_review.id
        }
        

      item_review_repo = ItemReviewRepository.new

      expect(ItemReviewRepository).to receive(:new).and_return(item_review_repo)
      expect(item_review_repo).to receive(:find_by_id).with(context_params[:item], context_params[:item_review_id]).and_return(@item_review)
      expect(item_review_repo).to receive(:delete).with(@item_review)

      result = DestroyItemReview.call(context_params)
      expect(result).to be_a_success
    end
end
