# == Schema Information
#
# Table name: user_profiles
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer
#  first_name    :string
#  last_name     :string
#  picture       :string
#  date_of_birth :datetime
#  location      :string
#  contact_list  :string           default([]), is an Array
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class UserProfile < ApplicationRecord
  validates :first_name, :last_name, :date_of_birth, presence: true

  has_many :user_reviews, dependent: :destroy
  belongs_to :user
  has_one_attached :image
end
