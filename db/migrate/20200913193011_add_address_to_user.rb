class AddAddressToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string, null: false
    add_column :users, :address_city, :string, null: false
    add_column :users, :address_line_1, :string, null: false
    add_column :users, :address_line_2, :string
    add_column :users, :address_state, :string, null: false
    add_column :users, :address_country, :string, null: false
    add_column :users, :address_post_zip, :string, null: false
  end
end
