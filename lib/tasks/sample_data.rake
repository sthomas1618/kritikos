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

  # Constellation.create!(name: "Spectre",
  #                       x: -200,
  #                       y: 100 )
  # Constellation.create!(name: "Norma",
  #                       x: -200,
  #                       y: 0 )
  # Constellation.create!(name: "Lynx",
  #                       x: -200,
  #                       y: -100 )
  # Constellation.create!(name: "Andromeda",
  #                       x: -200,
  #                       y: -200 )
  # Constellation.create!(name: "Ara",
  #                       x: -100,
  #                       y: -200 )
  # Constellation.create!(name: "Taurus",
  #                       x: 0,
  #                       y: -200 )
  # Constellation.create!(name: "Ursa Minor",
  #                       x: 100,
  #                       y: -200 )
  # Constellation.create!(name: "Ursa Major",
  #                       x: 200,
  #                       y: -200)

  # Constellation.create!(name: "Phoenix",
  #                       x: 200,
  #                       y: -100 )
  # Constellation.create!(name: "Pisces",
  #                       x: 200,
  #                       y: 0 )
  # Constellation.create!(name: "Lyra",
  #                       x: 200,
  #                       y: 100 )
  # Constellation.create!(name: "Virgo",
  #                       x: 200,
  #                       y: 200 )
  # Constellation.create!(name: "Triangulum",
  #                       x: 100,
  #                       y: 200 )
  # Constellation.create!(name: "Piscis Austrinus",
  #                       x: 0,
  #                       y: 200 )
  # Constellation.create!(name: "Leo",
  #                       x: -100,
  #                       y: 200 )
  # Constellation.create!(name: "Leo Minor",
  #                       x: -200,
  #                       y: 200)

end

def make_solar_systems
  constellations = Constellation.all
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
