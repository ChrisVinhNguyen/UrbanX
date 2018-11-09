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

class UserReview < ApplicationRecord
	belongs_to :reviewer, class_name: :User_Profile, foreign_key: :reviewer_id
	belongs_to :reviewee, class_name: :User_Profile, foreign_key: :reviewee_id
	belongs_to :user_profile
end
