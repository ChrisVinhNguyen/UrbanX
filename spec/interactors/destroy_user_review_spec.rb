require 'rails_helper'

describe DestroyUserReview do
  before do
    @user_review = FactoryBot.create(:user_review)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        user_profile: @user_review.user_profile,
        user_review_id: @user_review.id
      }

      result = DestroyUserReview.call(context_params)

      expect(result).to be_a_success
    end
  end

    it 'is invalid with no user_profile' do
      context_params = {
        user_review_id: @user_review.id
      }

      result = UpdateItem.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no user_review_id' do
      context_params = {
        user_profile: @user_review.user_profile
      }
      result = UpdateItem.call(context_params)

      expect(result).to be_a_failure
    end
  

    it 'calls methods successfully with params' do
        context_params = {
        user_profile: @user_review.user_profile,
        user_review_id: @user_review.id
      }
        
      user_review_repo = UserReviewRepository.new

      expect(UserReviewRepository).to receive(:new).and_return(user_review_repo)
      expect(user_review_repo).to receive(:find_by_id).with(context_params[:user_profile], context_params[:user_review_id]).and_return(@user_review)
      expect(user_review_repo).to receive(:delete).with(@user_review)

      result = DestroyUserReview.call(context_params)
      expect(result).to be_a_success
    end
end
