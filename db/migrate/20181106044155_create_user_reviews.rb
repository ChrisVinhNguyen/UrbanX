class CreateUserReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reviews do |t|
      t.float :rating
      t.text :comment
      t.datetime :created_at
      t.datetime :updated_at
      t.integer :user_id

      t.timestamps
    end
  end
end
