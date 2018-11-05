class Item < ApplicationRecord
	belongs_to :user
	has_many :item_reviews
	has_many :transactions
end
