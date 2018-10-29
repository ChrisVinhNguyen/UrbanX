class Transaction < ApplicationRecord
	belongs_to :user, foreign_key: 'borrower_id' 
	belongs_to :user, foreign_key: 'lender_id' 
	belongs_to :item
end
