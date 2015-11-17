class UpdateDate < ActiveRecord::Migration
  def change
    change_column :nearearthobjects, :close_approach_date, :string
  end
end
