class Item < ApplicationRecord
  validates :name, :category, :quantity, :condition, presence: true
  validates :quantity, numericality: { only_integer: true }

  belongs_to :user, class_name: :User, foreign_key: :user_id
  has_many :item_reviews, dependent: :destroy
  has_many :transactions
end
