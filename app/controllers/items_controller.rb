class ItemsController < ApplicationController
	belongs_to :user
	has_many :review
	belongs_to :transaction 
end
