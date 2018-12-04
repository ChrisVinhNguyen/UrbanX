require 'rails_helper'

describe AddUserReviewInfo do
  before do
    @user_review = FactoryBot.create(:user_review)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        user_profile: @user_review.user_profile,
        user_review_params: {
          rating: @user_review.rating,
          comment: @user_review.comment
        },
        reviewee_id: @user_review.reviewee_id,
        reviewer_id: @user_review.reviewer_id
      }

      result = AddUserReviewInfo.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no reviewee' do
      context_params = {
        user_review_params: {
          rating: @user_review.rating,
          comment: @user_review.comment
        },
        reviewee_id: @user_review.reviewee_id,
        reviewer_id: @user_review.reviewer_id
      }

      result = AddUserReviewInfo.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no user review params' do
      context_params = {
        user_profile: @user_review.user_profile,
        reviewee_id: @user_review.reviewee_id,
        reviewer_id: @user_review.reviewer_id
      }

      result = AddUserReviewInfo.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no reviewer_id' do
      context_params = {
        user_profile: @user_review.user_profile,
        user_review_params: {
          rating: @user_review.rating,
          comment: @user_review.comment
        },
        reviewee_id: @user_review.reviewee_id
      }


      result = AddUserReviewInfo.call(context_params)

      expect(result).to be_a_failure
    end


    it 'is invalid with no reviewee_id' do
      context_params = {
        user_profile: @user_review.user_profile,
        user_review_params: {
          rating: @user_review.rating,
          comment: @user_review.comment
        },
        reviewer_id: @user_review.reviewee_id
      }


      result = AddUserReviewInfo.call(context_params)

      expect(result).to be_a_failure
    end

  context 'call' do
    it 'add user review success with valid user_review_params' do
      context_params = {
        user_profile: @user_review.user_profile,
        user_review_params: {
          rating: @user_review.rating,
          comment: @user_review.comment
        },
        reviewee_id: @user_review.reviewee_id,
        reviewer_id: @user_review.reviewer_id
      }

      result = AddUserReviewInfo.call(context_params)

      expect(result.user_review.rating).to eq(context_params[:user_review_params][:rating])
      expect(result.user_review.comment).to eq(context_params[:user_review_params][:comment])
    end
   end
  end
end
