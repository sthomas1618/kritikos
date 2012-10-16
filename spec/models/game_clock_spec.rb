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

require 'spec_helper'

describe GameClock do
  before do
    @game_clock = GameClock.new() 
  end

  subject { @game_clock }

  it { should respond_to(:turn) }
  it { should respond_to(:tick) }
  it { should be_valid }

  describe "when turn is nil" do
    before { @game_clock.turn = nil }
    it { should_not be_valid }
  end

  describe "when tick is nil" do
    before { @game_clock.tick = nil }
    it { should_not be_valid }
  end

  describe "when saving game clock" do
    it "should increment the turn only on 4th tick" do
      @game_clock.update_attribute(:tick, 3)
      expect{ @game_clock.save }.to change{ @game_clock.turn }
    end

    it "should not increment the turn on off ticks" do
      expect{ @game_clock.update_attribute(:tick, 1) }.to_not change{ @game_clock.turn }
    end

    it "should change the tick" do
      expect{ @game_clock.update_attribute(:tick, 3)  }.to change{ @game_clock.tick }
    end

    it "should reset tick at end of turn" do
      @game_clock.update_attribute(:tick, 3) 
      expect { @game_clock.save }.to change{ @game_clock.tick }.from(3).to(0)
    end
  end

  describe "when incrementing tick by more than 1" do
    before do
      @game_clock.save
      @game_clock.increment(:tick, 2)
    end

    it { should_not be_valid }
  end

  describe "when incrementing turn by more than 1" do
    before do
      @game_clock.save
      @game_clock.increment(:turn, 2)
    end

    it { should_not be_valid }
  end

end
