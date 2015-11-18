require "faker"

desc "add fake names to NEOs"

task :fake_names => :environment do
  Nearearthobject.all.each_with_index do |o, i|
    o.update(nickname: "#{Faker::Book.title} - #{i}")
    o.save
  end
end
