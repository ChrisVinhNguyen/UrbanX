# == Schema Information
#
# Table name: items
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  picture     :string
#  description :text
#  category    :string
#  quantity    :integer
#  condition   :string
#  date_posted :datetime
#  value       :float
#  user_id     :integer
#  status      :string
#

class Item < ApplicationRecord
  validates :name, :category, :quantity, :condition, presence: true
  validates :quantity, numericality: { only_integer: true }

  belongs_to :user, class_name: :User, foreign_key: :user_id
  has_many :item_reviews, dependent: :destroy
  has_many :transactions
end
