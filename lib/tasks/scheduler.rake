require 'uri'
require 'net/http'

desc "create_post"

task :create_post => :environment do
  url = URI("https://android.googleapis.com/gcm/send")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE

  request = Net::HTTP::Post.new(url)
  request["content-type"] = 'application/json'
  request["authorization"] = 'key=AIzaSyA_ZSDpk5w5Jq25A-aGCtwnmpxSVCJwy5o'
  request["cache-control"] = 'no-cache'
  request.body = "{\"registration_ids\": #{SubscribedUser.get_endpoints}}"

  response = http.request(request)
  puts response.read_body
end
