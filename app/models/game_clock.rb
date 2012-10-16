# == Schema Information
#
# Table name: game_clocks
#
#  id         :integer          not null, primary key
#  turn       :integer          default(0), not null
#  tick       :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GameClock < ActiveRecord::Base
  attr_accessible :tick, :turn

  before_update :increment_turn_and_tick

  validates :turn,  presence: true, numericality: { only_integer:  true,
                                                    greater_than_or_equal_to: 0, }
  validates :tick,  presence: true, numericality: { only_integer: true,
                                                    greater_than_or_equal_to: 0,
                                                    less_than: 4 }
  validate :only_increment_turn_by_one, on: :update
  validate :only_increment_tick_by_one, on: :update

  private 
    def end_of_turn? 
      tick == 3
    end

    def increment_turn_and_tick
      if(self.tick < 3)
        self.increment(:tick)
      else
        self.tick = 0
        self.increment(:turn)
      end
    end

    def only_increment_turn_by_one 
      turn_was_eq = turn_was + 1
      if (turn > turn_was_eq) 
        errors.add(:turn, 'Can only increment turn by 1')
      end
    end

    def only_increment_tick_by_one
      tick_was_eq = tick_was + 1
      if (tick > tick_was_eq) 
        errors.add(:tick, 'Can only increment tick by 1')
      end
    end
end
