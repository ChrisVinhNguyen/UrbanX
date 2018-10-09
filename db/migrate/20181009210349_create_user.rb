class CreateUser < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
    	t.string :first_name
			t.string :last_name
			t.string :picture
			t.string :email, uniqueness: true
			t.string :password
			t.datetime :date_of_birth
			t.string :location
			t.integer :review_id
			t.integer :transaction_id
			t.string :contact_list, array: true, default: []
			t.integer :items
    end
  end
end