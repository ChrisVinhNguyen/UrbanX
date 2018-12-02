class AddingPointsToUserProfile < ActiveRecord::Migration[5.2]
  def change
  	add_column :user_profiles, :points, :integer
  end
end
