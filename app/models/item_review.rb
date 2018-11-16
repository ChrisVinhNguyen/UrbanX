# == Schema Information
#
# Table name: item_reviews
#
#  id         :bigint(8)        not null, primary key
#  comment    :text
#  rating     :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  item_id    :bigint(8)
#  owner_id   :integer
#
# Indexes
#
#  index_item_reviews_on_item_id  (item_id)
#
# Foreign Keys
#
#  fk_rails_...  (item_id => items.id)
#

class ItemReview < ApplicationRecord
  belongs_to :item 
end
