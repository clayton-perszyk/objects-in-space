class SubscribedUsers < ActiveRecord::Migration
  def change
    create_table :subscribed_users do |t|
      t.string :endpoint
      t.timestamps
    end
  end
end
