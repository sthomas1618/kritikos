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
  n = 1
  stellas.each do |stella|
    min_x = stella.x - 50
    max_x = stella.x + 50
    min_y = stella.y - 50
    max_y = stella.y + 50
    5.times do
      x = random_between min_x, max_x
      y = random_between min_y, max_y
      name  = Faker::Name.name
      username = "example_#{n + 1}"
      email = "example-#{n + 1}@kritikos.io"
      password = "alliance"
      user = User.create!(name: name,
                         username: username,
                         email: email,
                         password: password,
                         password_confirmation: password)
      sol = stella.solar_systems.new
      sol.x = x
      sol.y = y
      sol.user = user
      sol.save!
      n += 1
    end
  end
end

def make_planets
  sols = SolarSystem.all
  sols.each do |sol|
    num_of = Random.rand(6...9)
    min_dist = 0.03
    max_dist = 0.5
    min_size = 0.5
    max_size = 10
    num_of.times do
      dist = random_between min_dist, max_dist
      size = random_between min_size, max_size
      planet = sol.planets.new
      planet.orbital_radius = dist
      planet.radius = size
      planet.save!
    end
  end
end
