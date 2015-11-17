class AddCategoriesToNeo < ActiveRecord::Migration
  def change
    add_column :nearearthobjects, :sizeCatagory, :string
    add_column :nearearthobjects, :pha, :boolean
  end
end
