desc "add fake names to NEOs"

task :fake_names => :environment do
  Nearearthobject.all.each do |o|
    o.update(name: Faker::Book.title)
  end
end
