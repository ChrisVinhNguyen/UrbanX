class ChangeDateOfBirthToBeDateInUserProfile < ActiveRecord::Migration[5.2]
  def change
    change_column :user_profiles, :date_of_birth, :date
  end
end
