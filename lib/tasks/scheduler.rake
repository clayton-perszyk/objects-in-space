desc "create_post"

task :create_post => :environment do
  @endpoints = SubscribedUser.get_endpoints

  
end
