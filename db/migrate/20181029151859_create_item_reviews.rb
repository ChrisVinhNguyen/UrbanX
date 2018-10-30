class CreateItemReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :item_reviews do |t|
      t.integer :item_id
      t.float :rating
      t.text :comment
      t.datetime :date

      t.timestamps
    end
  end
end