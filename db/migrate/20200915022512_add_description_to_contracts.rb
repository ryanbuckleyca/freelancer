class AddDescriptionToContracts < ActiveRecord::Migration[6.0]
  def change
    add_column :contracts, :description, :string, null: false
  end
end
