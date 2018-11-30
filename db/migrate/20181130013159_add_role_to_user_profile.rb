class AddRoleToUserProfile < ActiveRecord::Migration[5.2]
  def change
  	add_column :user_profiles, :role, :string, default: "user"
  end
end
