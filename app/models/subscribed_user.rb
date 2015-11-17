class SubscribedUser < ActiveRecord::Base

  def self.get_endpoints
    @subscribedUsers = self.all
    endpoints = []

    @subscribedUsers.each do |user|
      endpoints << user.endpoint
    end

    endpoints 
  end
end
