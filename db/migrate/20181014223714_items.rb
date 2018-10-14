class Items < ActiveRecord::Migration[5.2]
  def change
  	create_table :items do |t|
  		t.string :name 
  		t.string :picture 
  		t.text :description 
  		t.string :category 
  		t.integer :quantity 
  		t.string :condition
  		t.datetime :date_posted
  		t.float :value
  		t.integer :owner_id
  		t.string :status 
  		t.integer :review_id 
  	end
  end
end
