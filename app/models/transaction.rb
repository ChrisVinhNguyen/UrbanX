# == Schema Information
#
# Table name: transactions
#
#  id          :bigint(8)        not null, primary key
#  item_id     :integer
#  borrower_id :integer
#  lender_id   :integer
#  lend_date   :datetime
#  return_date :datetime
#  expiry_date :datetime
#  status      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Transaction < ApplicationRecord
	belongs_to :borrower, class_name: :User, foreign_key: :borrower_id
	belongs_to :lender, class_name: :User, foreign_key: :lender_id
	belongs_to :item
end
