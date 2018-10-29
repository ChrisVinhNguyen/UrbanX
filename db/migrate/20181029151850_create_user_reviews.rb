class CreateUserReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reviews do |t|
    	t.references :user, index: true, foreign_key: true
      t.float :rating
      t.text :comment
      t.datetime :date

      t.timestamps
    end
  end
end