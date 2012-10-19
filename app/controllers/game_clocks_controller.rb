class GameClocksController < ApplicationController
  respond_to :html, :json

  def clock
    @clock = GameClock.first
  end
end
