# == Schema Information
#
# Table name: item_reviews
#
#  id         :bigint(8)        not null, primary key
#  rating     :float
#  comment    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer
#  item_id    :bigint(8)
#

class ItemReview < ApplicationRecord
  belongs_to :item
end
