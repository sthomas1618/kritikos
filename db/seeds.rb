# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if(GameClock.count == 0)
    GameClock.create()
    puts "Clock created"
  else
    puts "Clock exists."
end


#\u00F6 == ö
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

# create constellations
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
    Constellation.create!(name: stella_names[k], x: i, y: j)
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
