# require "kritikos/app/helpers/application_helper"
# include ApplicationHelper

namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    include ApplicationHelper
    create_solar_systems
  end
end


def create_solar_systems
  stellas = Constellation.all
  stellas.each do |stella|
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

def make_planet(sol)
  sols = SolarSystem.all
  sols.each do |sol|
    Random.rand(6...9)
    min_x = sol.x - 5
    max_x = sol.x + 5
    min_y = sol.y - 5
    max_y = sol.y + 5
    5.times do
      x = random_between min_x, max_x
      y = random_between min_y, max_y
      stella.solar_systems.create!(x: x, y: y)
    end
  end
end
