require 'rails_helper'

describe AddItemReviewInfo do
  before do
    @item_review = FactoryBot.create(:item_review)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        item: @item_review.item,
        item_review_params: {
          rating: @item_review.rating,
          comment: @item_review.comment
        },
        owner_id: @item_review.item.user_id
      }

      result = AddItemReviewInfo.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no item' do
      context_params = {
        item_review_params: {
          rating: @item_review.rating,
          comment: @item_review.comment
        },
        owner_id: @item_review.item.user_id
      }

      result = AddItemReviewInfo.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no item review params' do
      context_params = {
        item: @item_review.item,
        owner_id: @item_review.item.user_id
      }

      result = AddItemReviewInfo.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no owner id' do
      context_params = {
        item: @item_review.item,
        item_review_params: {
          rating: @item_review.rating,
          comment: @item_review.comment
          }
        }


      result = AddItemReviewInfo.call(context_params)

      expect(result).to be_a_failure
    end

  context 'call' do
    it 'add item review success with valid item_review_params' do
      context_params = {
        item: @item_review.item,
        item_review_params: {
          rating: 5.0,
          comment: "test comment"
        },
        owner_id: @item_review.item.user_id
      }

      result = AddItemReviewInfo.call(context_params)

      expect(result.item_review.rating).to eq(context_params[:item_review_params][:rating])
      expect(result.item_review.comment).to eq(context_params[:item_review_params][:comment])
    end
   end
 end
end
