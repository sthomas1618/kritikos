class GameClockObserver < ActiveRecord::Observer
  include BackboneSync::Rails::Faye::Observer
end