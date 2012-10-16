module Advance_clock
  @queue = :game

  def self.perform()
    game_clock = GameClock.first
    if(game_clock)
      game_clock.save
      puts "Turn #{game_clock.turn}, Tick #{game_clock.tick}"
    else
      puts "GameClock does not exist."
    end
  end
end