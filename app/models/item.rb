class Item < ApplicationRecord
	belongs_to :user
	has_many :reviews
	belongs_to :transaction 
	validates :name ,:category, :quantity, :data_posted, :owner_id, :status, presence: true
end
