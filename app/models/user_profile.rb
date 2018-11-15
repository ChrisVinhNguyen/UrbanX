# == Schema Information
#
# Table name: user_profiles
#
#  id            :bigint(8)        not null, primary key
#  contact_list  :string           default([]), is an Array
#  date_of_birth :date
#  first_name    :string
#  last_name     :string
#  location      :string
#  picture       :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer
#

class UserProfile < ApplicationRecord
  validates :first_name, :last_name, :date_of_birth, presence: true

  has_many :user_reviews, dependent: :destroy
  belongs_to :user
  has_one_attached :image
end
