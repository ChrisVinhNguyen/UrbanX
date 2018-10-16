class Item < ApplicationRecord
	belongs_to :user
	has_many :reviews
	belongs_to :transaction 
end
