class AdddistanceCatagory < ActiveRecord::Migration
  def change
    add_column :nearearthobjects, :distanceCatagory, :string
  end
end
