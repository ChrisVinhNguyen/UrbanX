class RemovePictureFromItem < ActiveRecord::Migration[5.2]
  def change
    remove_column :items, :picture, :string
  end
end
