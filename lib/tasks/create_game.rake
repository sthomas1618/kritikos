desc "Creates the GameClock and any other initial models"
task :create_game => :environment do
  if(GameClock.count == 0)
    GameClock.create()
    puts "Clock created"
  else
    puts "Clock exists."
  end

  puts "Beginning ticks soon."
end