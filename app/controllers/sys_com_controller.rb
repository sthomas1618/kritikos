class SysComController < ApplicationController
  before_filter :signed_in_user
  
  def index
  	@clock = GameClock.first
  end
end
