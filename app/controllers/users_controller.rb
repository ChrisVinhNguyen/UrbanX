class UsersController < ApplicationController
	has_many :items
	has_many :transactions
	has_many :reviews 
	
end
