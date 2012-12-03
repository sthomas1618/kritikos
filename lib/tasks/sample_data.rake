# require "kritikos/app/helpers/application_helper"
# include ApplicationHelper

namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    include ApplicationHelper
    #make_constellations
    make_solar_systems
  end
end
#\u00F6 == ö
def make_constellations
  stella_names = ["Antlia", "Apus", "Aquarius", "Aquila", "Ara", "Aries", "Auriga", "Bo\u00F6tes", 
                  "Caelum", "Camelopardalis", "Cancer", "Canes Venatici", "Canis Major", 
                  "Canis Minor", "Capricornus", "Carina", "Cassiopeia", "Centaurus", "Cepheus",
                  "Cetus", "Chamaeleon", "Circinus", "Columba", "Coma Berenices", "Corona Austrina",
                  "Corona Borealis", "Corvus", "Crater", "Crux", "Cygnus", "Delphinus", "Dorado",
                  "Draco", "Equuleus", "Eridanus", "Fornax", "Gemini", "Grus", "Hercules",
                  "Horologium", "Hydra", "Hydrus", "Indus", "Lacerta", "Leo", "Leo Minor", "Lepus",
                  "Libra", "Lupus", "Lynx", "Lyra", "Mensa", "Microscopium", "Monoceros", 
                  "Musca", "Norma", "Octans", "Ophiuchus", "Orion", "Pavo", "Pegasus", "Perseus",
                  "Phoenix", "Pictor", "Pisces", "Piscis Austrinus", "Puppis", "Pyxis", "Reticulum",
                  "Sagitta", "Sagittarius", "Scorpius", "Sculptor", "Scutum", "Serpens", "Sextans",
                  "Taurus", "Telescopium", "Triangulum", "Triangulum Australe", "Tucana",
                  "Ursa Major", "Ursa Minor", "Vela", "Virgo", "Volans", "Vulpecula", "Aegis",
                  "Gladius", "Javelin", "Spartan", "Spectre"]
  stella_names.shuffle!

  # spiral algorithm translated from:
  #http://stackoverflow.com/questions/3706219/algorithm-for-iterating-over-an-outward-spiral-on-a-discrete-2d-grid-from-the-or
  di = 100
  dj = 0
  segment_length = 1
  i = 0
  j = 0
  segment_passed = 0
  stella_names.count.times do |k| 
      #puts "#{i}, #{j}"
      Constellation.create!(name: stella_names[k],
                        x: i,
                        y: j )
      i += di
      j += dj
      segment_passed += 1
      if segment_passed == segment_length
          segment_passed = 0
          buffer = di
          di = -dj
          dj = buffer
          if dj == 0
              segment_length += 1
          end
      end
  end
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

def make_planet(sol)
  constellations = Constellation.all
  constellations.each do |stella|
    Random.rand(10...42)
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
