class CreateItems < ActiveRecord::Migration[5.2]
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
  		t.references :owner, index: true, foreign_key: { to_table: :users }
  		t.string :status
  	end
  end
end