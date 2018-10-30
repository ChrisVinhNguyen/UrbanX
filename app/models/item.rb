class Item < ApplicationRecord
	belongs_to :owner, class_name: :User, foreign_key: :owner_id
	has_many :item_reviews
	has_many :transactions
end
