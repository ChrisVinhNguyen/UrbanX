class AddItemNameToTransactions < ActiveRecord::Migration[5.2]
  def change
  	add_column :transactions, :item_name, :string
  end
end
