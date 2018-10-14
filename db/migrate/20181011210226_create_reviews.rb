class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.float :rating
      t.text :comment
      t.datetime :date

      t.timestamps
    end
  end
end
