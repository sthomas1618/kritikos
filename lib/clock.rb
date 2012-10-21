require File.expand_path('../../config/boot',        __FILE__)
require File.expand_path('../../config/environment', __FILE__)

require 'rubygems'
require 'clockwork'
include Clockwork

handler do |job|
  
end

every(7.seconds, 'Advance_clock') { Resque.enqueue(Advance_clock) }
every(8.seconds, 'Check clock') do 
  game_clock = GameClock.first 
  puts "Turn #{game_clock.turn}, Tick #{game_clock.tick}"
end