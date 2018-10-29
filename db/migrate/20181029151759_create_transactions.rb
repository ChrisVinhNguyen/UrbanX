class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.references :item, index: true, foreign_key: true
      t.references :borrower, index: true, foreign_key: { to_table: :users }
      t.references :lender, index: true, foreign_key: { to_table: :users }
      t.datetime :lend_date
      t.datetime :return_date
      t.datetime :expiry_date
      t.string :status
      t.timestamps
    end
  end
end