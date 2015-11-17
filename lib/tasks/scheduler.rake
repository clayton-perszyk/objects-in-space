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
#   body = {}
#   body['registration_ids'] = SubscribedUser.get_endpoints
#
#   #  "Authorization: key=AIzaSyA_ZSDpk5w5Jq25A-aGCtwnmpxSVCJwy5o" --header Content-Type:"application/json"
#   request = Typhoeus::Request.new(
#   "https://android.googleapis.com/gcm/send",
#   method: :post,
#   body: registration_ids = SubscribedUser.get_endpoints,
#   headers: { Authorization: "key=AIzaSyA_ZSDpk5w5Jq25A-aGCtwnmpxSVCJwy5o", "Content-Type": "application/json" }
# )
#
#
#   puts "before"
#   request.on_complete do |response|
#     puts "something"
#    if response.success?
#      puts "YAY"
#    elsif response.timed_out?
#      # aw hell no
#      puts "got a time out"
#    elsif response.code == 0
#      # Could not get an http response, something's wrong.
#      puts response.return_message
#    else
#      # Received a non-successful http response.
#      puts ("HTTP request failed: " + response.code.to_s)
#    end
#   end
#   request.run
end
