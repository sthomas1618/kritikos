require 'ostruct'

class PlanetsController < ApplicationController
  respond_to :html, :json

  def index
    @sol = SolarSystem.find(params[:solar_system_id])
    @planets = @sol.planets
  end

  def show
    @planet = Planet.find(params[:id])
  end
end