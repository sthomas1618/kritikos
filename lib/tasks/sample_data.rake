# require "kritikos/app/helpers/application_helper"
# include ApplicationHelper

namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    include ApplicationHelper
    make_constellations
    make_solar_systems
  end
end

def make_constellations
  Constellation.create!(name: "Aegis",
                        x: 0,
                        y: 0 )
  Constellation.create!(name: "Gladius",
                        x: 0,
                        y: -100 )
  Constellation.create!(name: "Javelin",
                        x: -100,
                        y: -100 )
  Constellation.create!(name: "Spartan",
                        x: -100,
                        y: 0 )
  Constellation.create!(name: "Orion",
                        x: -100,
                        y: 100 )
  Constellation.create!(name: "Perseus",
                        x: 0,
                        y: 100 )
  Constellation.create!(name: "Scorpio",
                        x: 100,
                        y: 100 )
  Constellation.create!(name: "Cancer",
                        x: 100,
                        y: 0 )
  Constellation.create!(name: "Leo",
                        x: 100,
                        y: -100)
end

def make_solar_systems
  constellations = Constellation.all(limit: 9)
  constellations.each do |stella|
    min_x = stella.x - 50
    max_x = stella.x + 50
    min_y = stella.y - 50
    max_y = stella.y + 50
    5.times do
      x = random_between min_x, max_x
      y = random_between min_y, max_y
      stella.solar_systems.create!(x: x, y: y)
    end
  end
end
