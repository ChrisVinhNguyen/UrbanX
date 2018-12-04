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
    it 'update item reviews successfully with valid item_review_params' do
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

    it 'calls methods successfully with params' do
      context_params = {
        item: @item_review.item,
        item_review_id: @item_review.id,
        item_review_params: {
          rating: 5.0,
          comment: "test comment"
        }
      }

      item_review_repo = ItemReviewRepository.new

      expect(ItemReviewRepository).to receive(:new).and_return(item_review_repo)
      expect(item_review_repo).to receive(:find_by_id).with(context_params[:item], context_params[:item_review_id]).and_return(@item_review)
      expect(item_review_repo).to receive(:update).with(@item_review, context_params[:item_review_params])
      expect(DateTime).to receive(:now)

      result = UpdateItemReview.call(context_params)
      expect(result).to be_a_success
    end

    it 'update item_review fails with invalid item_reivew_id that does not exist' do
      context_params = {
        item: @item_review.item,
        item_review_id: @item_review.id + 1,
        item_review_params: {
          rating: 5.0,
          comment: "test comment"
        }
      }

      item_review_repo = ItemReviewRepository.new

      expect(ItemReviewRepository).to receive(:new).and_return(item_review_repo)

      expect(item_review_repo).to receive(:find_by_id).with(context_params[:item], context_params[:item_review_id]).and_return("Couldn't find ItemReview with 'id'=${context_params[:item_review_id] + 1}")
      expect(DateTime).not_to receive(:now)
      expect(item_review_repo).not_to receive(:update).with(@item_review, context_params[:item_review_params])

      result = UpdateItemReview.call(context_params)
    end

    it 'update item_review fail with invalid item_review_params rating' do
      context_params = {
        item: @item_review.item,
        item_review_id: @item_review.id,
        item_review_params: {
          rating: "hello"
        }
      }

      result = UpdateItemReview.call(context_params)
      expect(result.item_review[:rating]).not_to eq(context_params[:item_review_params][:rating])
    end
  end
end
