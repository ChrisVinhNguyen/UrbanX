class ChangeOwnerIdToUserIfItems < ActiveRecord::Migration[5.2]
  def change
  	rename_column :items, :owner_id, :user_id
  end
end
