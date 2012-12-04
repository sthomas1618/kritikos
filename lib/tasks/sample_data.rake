# require "kritikos/app/helpers/application_helper"
# include ApplicationHelper

namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    include ApplicationHelper
    create_solar_systems
    make_planets
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

def make_planets
  sols = SolarSystem.all
  sols.each do |sol|
    num_of = Random.rand(6...9)
    min_dist = 0.03
    max_dist = 0.5
    num_of.times do
      dist = random_between min_dist, max_dist
      sol.planets.create!(orbital_radius: dist, )
    end
  end
end
