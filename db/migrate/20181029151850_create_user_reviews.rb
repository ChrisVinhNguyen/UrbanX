class CreateUserReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reviews do |t|
      t.integer :user_id
      t.float :rating
      t.text :comment
      t.datetime :date

      t.timestamps
    end
  end
end