class CreateUserReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reviews do |t|
      t.float :rating
      t.text :comment
      t.datetime :date
      t.datetime :created_at
      t.datetime :updated_at
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
