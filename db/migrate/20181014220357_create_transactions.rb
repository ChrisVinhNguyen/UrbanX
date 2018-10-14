class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :item_id
      t.integer :borrower_id
      t.integer :lender_id
      t.datetime :lend_date
      t.datetime :return_date
      t.datetime :expiry_date
      t.string :status
      t.timestamps
    end
  end
end
