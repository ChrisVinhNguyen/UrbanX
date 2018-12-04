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
  validates :comment, :rating, :reviewee_id, :reviewer_id, :created_at, :updated_at, presence: true
  validates :rating, numericality: true

  belongs_to :reviewee, class_name: :UserProfile, foreign_key: :reviewee_id

end
