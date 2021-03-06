# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'net/http'
key = "FDF8cJsgpVwVozoyQ4GZL0Pe8CLaG6heSPW8JeoV"
url = URI.parse("https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-01-01&api_key=FDF8cJsgpVwVozoyQ4GZL0Pe8CLaG6heSPW8JeoV");
result = Net::HTTP.get(url)
if ENV["RAILS_ENV"] === "development"
  20.times do
    url = URI.parse(JSON.parse(result)['links']['next'])
    result = Net::HTTP.get(url)

    JSON.parse(result)["near_earth_objects"].each do |neoArray|
      neoObject = {}
      neoObject['close_approach_date'] = neoArray[0].to_s.split(' ')[0];
      neoArray[1].each do |neo|
        neoObject['name'] = neo["name"]
        neoObject["close_approach_distance"] = neo["close_approach_data"][0]["miss_distance"]["lunar"].to_i;
        neoObject['velocity'] = neo['close_approach_data'][0]['relative_velocity']['kilometers_per_second']
        neoObject['size'] =  (neo["estimated_diameter"]["meters"]["estimated_diameter_min"].to_i + neo["estimated_diameter"]["meters"]["estimated_diameter_max"].to_i) / 2
        neoObject['pha'] = neo["is_potentially_hazardous_asteroid"]

        if neoObject["size"] <= 3
          neoObject["sizeCatagory"] = 'person'
        elsif neoObject["size"] <= 5
          neoObject["sizeCatagory"] = 'house'
        elsif neoObject["size"] <= 20
          neoObject["sizeCatagory"] = 'football field'
        elsif neoObject["size"] <= 100
          neoObject["sizeCatagory"] = 'skyscraper'
        elsif neoObject["size"] <= 4000
          neoObject["sizeCatagory"] = 'city'
        elsif neoObject["size"] <= 5000000
          neoObject["sizeCatagory"] = 'great lake'
        elsif
          neoObject["sizeCatagory"] = 'too damn big'
        end

        if neoObject["close_approach_distance"] <= 50
          neoObject["distanceCatagory"] = "0 - 50"
        elsif neoObject['close_approach_distance'] <= 100
          neoObject["distanceCatagory"] = "50 - 100"
        elsif neoObject['close_approach_distance'] <= 150
          neoObject["distanceCatagory"] = "100 - 150"
        else
          neoObject["distanceCatagory"] = "150+"
        end

        Nearearthobject.create(neoObject)

      end
    end
  end
else
  while(URI.parse(JSON.parse(result)['links']['next'])) do
    url = URI.parse(JSON.parse(result)['links']['next'])
    result = Net::HTTP.get(url)

    JSON.parse(result)["near_earth_objects"].each do |neoArray|
      neoObject = {}
      neoObject['close_approach_date'] = neoArray[0].to_s.split(' ')[0];
      neoArray[1].each do |neo|
        neoObject['name'] = neo["name"]
        neoObject["close_approach_distance"] = neo["close_approach_data"][0]["miss_distance"]["lunar"].to_i;
        neoObject['velocity'] = neo['close_approach_data'][0]['relative_velocity']['kilometers_per_second']
        neoObject['size'] =  (neo["estimated_diameter"]["meters"]["estimated_diameter_min"].to_i + neo["estimated_diameter"]["meters"]["estimated_diameter_max"].to_i) / 2
        neoObject['pha'] = neo["is_potentially_hazardous_asteroid"]

        if neoObject["size"] <= 3
          neoObject["sizeCatagory"] = 'person'
        elsif neoObject["size"] <= 5
          neoObject["sizeCatagory"] = 'house'
        elsif neoObject["size"] <= 20
          neoObject["sizeCatagory"] = 'football field'
        elsif neoObject["size"] <= 100
          neoObject["sizeCatagory"] = 'skyscraper'
        elsif neoObject["size"] <= 4000
          neoObject["sizeCatagory"] = 'city'
        elsif neoObject["size"] <= 5000000
          neoObject["sizeCatagory"] = 'great lake'
        elsif
          neoObject["sizeCatagory"] = 'too damn big'
        end

        if neoObject["close_approach_distance"] <= 50
          neoObject["distanceCatagory"] = "0 - 50"
        elsif neoObject['close_approach_distance'] <= 100
          neoObject["distanceCatagory"] = "50 - 100"
        elsif neoObject['close_approach_distance'] <= 150
          neoObject["distanceCatagory"] = "100 - 150"
        else
          neoObject["distanceCatagory"] = "150+"
        end

        Nearearthobject.create(neoObject)

      end
    end
  end
end
