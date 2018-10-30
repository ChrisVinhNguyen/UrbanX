class CreateUserProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :user_profiles do |t|
      t.integer :user_id
      t.string :first_name
      t.string :last_name
      t.string :picture
      t.datetime :date_of_birth
      t.string :location
      t.string :contact_list, array: true, default: []
      t.timestamps
    end
  end
end
