class CreateItemReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :item_reviews do |t|
      t.float :rating
      t.text :comment
      t.datetime :date
      t.references :item, foreign_key: true

      t.timestamps
    end
  end
end