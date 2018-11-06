class Item < ApplicationRecord
	belongs_to :user, class_name: :User, foreign_key: :user_id
	has_many :item_reviews, dependent: :destroy 
	has_many :transactions
end
