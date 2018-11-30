class RemoveRoleToUserProfile < ActiveRecord::Migration[5.2]
  def change
  	remove_column :user_profiles, :role, :string
  end
end
