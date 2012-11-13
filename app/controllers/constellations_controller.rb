class ConstellationsController < ApplicationController
	
	def index
		distance = 200
		center_point = (params[:x] && params[:y]) ? [params[:x], params[:y]] : [0, 0]
		box = Starcharter::Calculations.bounding_box(center_point, distance)
  	@constellations = Constellation.within_bounding_box(box)
  end
end
