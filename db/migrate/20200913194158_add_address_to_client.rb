class AddAddressToClient < ActiveRecord::Migration[6.0]
  def change
    remove_column :clients, :address, :string
    add_column :clients, :address_city, :string, null: false
    add_column :clients, :address_line_1, :string, null: false
    add_column :clients, :address_line_2, :string
    add_column :clients, :address_state, :string, null: false
    add_column :clients, :address_country, :string, null: false
    add_column :clients, :address_post_zip, :string, null: false
  end
end
