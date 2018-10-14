class TransactionsController < ApplicationController
	belongs_to :user 
	has_one :item 
end
