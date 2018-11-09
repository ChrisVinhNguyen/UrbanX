# == Schema Information
#
# Table name: transactions
#
#  id          :bigint(8)        not null, primary key
#  expiry_date :datetime
#  lend_date   :datetime
#  return_date :datetime
#  status      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  borrower_id :integer
#  item_id     :integer
#  lender_id   :integer
#

require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
