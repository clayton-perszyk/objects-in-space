class SubscribedUser < ActiveRecord::Base

  def self.get_endpoints
    @subscribedUsers = self.all
    endpoints = []

    @subscribedUsers.each do |user|
      endpoints << user.endpoint
    end
    puts endpoints
    uri = URI('http://android.googleapis.com/gcm/send')
    res = Net::HTTP.post_form(uri, 'q' => endpoints, 'max' => '50')
    puts res.body
  end
end
