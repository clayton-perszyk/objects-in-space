class AddNickname < ActiveRecord::Migration
  def change
    add_column :nearearthobjects, :nickname, :string
  end
end
