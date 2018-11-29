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
  validates :first_name, :last_name, :date_of_birth, :date_of_birth, :location, :created_at, :updated_at, presence: true

  has_many :user_reviews, dependent: :destroy, foreign_key: :reviewee_id
  belongs_to :user
  has_one_attached :image
  validate :image_type

  def full_name
    self.first_name << " " << self.last_name
  end

  private 
  def image_type
    if image.attached?     
        if !image.content_type.in?(%('image/jpeg image/png image/jpg'))
          errors.add(:image, 'needs to be JPEG/JPG/PNG')

        elsif image.blob.byte_size > 1000000
          errors.add(:image, 'file size too big')
		    end
    end
  end

end
