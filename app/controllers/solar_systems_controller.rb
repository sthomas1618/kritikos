require 'ostruct'

class SolarSystemsController < ApplicationController
  respond_to :html, :json

  def index
    @sol_systems = all_sol_systems
  end

  def all_sol_systems
  	sol1 = OpenStruct.new( {
			  			x: 1.2,
			  			y: 2.7
			  		})
  	sol2 = OpenStruct.new( {
			  			x: 4,
			  			y: 6.6
			  		})
  	sol3 = OpenStruct.new( {
			  			x: 9,
			  			y: 9
			  		})
  	sol4 = OpenStruct.new( {
			  			x: 4.4,
			  			y: 1
			  		})
  	sol5 = OpenStruct.new( {
			  			x: 3.3,
			  			y: 6
			  		})
  	sol6 = OpenStruct.new( {
			  			x: 7,
			  			y: 2
			  		})
  	sol7 = OpenStruct.new( {
			  			x: 5.5,
			  			y: 3
			  		})
  	sol8 = OpenStruct.new( {
			  			x: 2,
			  			y: 6
			  		})
  	sol9 = OpenStruct.new( {
			  			x: 2.5,
			  			y: 8
			  		})
  	sols = [
	  		sol1,
	  		sol2,
	  		sol3,
	  		sol4,
	  		sol5,
	  		sol6,
	  		sol7,
	  		sol8,
	  		sol9
  	]
  end
end