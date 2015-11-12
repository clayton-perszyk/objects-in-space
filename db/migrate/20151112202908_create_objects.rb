class CreateObjects < ActiveRecord::Migration
  def change
    create_table :nearearthobjects do |t|
      t.string :name
      t.datetime :close_approach_date
      t.integer :close_approach_distance
      t.integer :velocity
      t.integer :size
    end
  end
end
