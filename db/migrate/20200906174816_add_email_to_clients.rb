class AddEmailToClients < ActiveRecord::Migration[6.0]
  def change
    add_column :clients, :email, :string, null: false
  end
end
