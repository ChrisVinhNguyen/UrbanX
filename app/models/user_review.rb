# == Schema Information
#
# Table name: user_reviews
#
#  id         :bigint(8)        not null, primary key
#  rating     :float
#  comment    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class UserReview < ApplicationRecord
end
