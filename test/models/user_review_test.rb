# == Schema Information
#
# Table name: user_reviews
#
#  id          :bigint(8)        not null, primary key
#  comment     :text
#  rating      :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  reviewee_id :integer
#  reviewer_id :integer
#

require 'test_helper'

class UserReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
