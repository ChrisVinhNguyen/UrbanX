class CreateItemReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :item_reviews do |t|
    	t.references :item, index: true, foreign_key: true
      t.float :rating
      t.text :comment
      t.datetime :date

      t.timestamps
    end
  end
end