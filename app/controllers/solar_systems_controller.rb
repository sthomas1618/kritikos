require 'ostruct'

class SolarSystemsController < ApplicationController
  respond_to :html, :json

  def index
  	@stella = Constellation.find(params[:constellation_id])
    @sol_systems = @stella.solar_systems
  end

  def show
    @sol = SolarSystem.find(params[:id])
  end
end