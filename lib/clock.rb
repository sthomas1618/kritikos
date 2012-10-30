require File.expand_path('../../config/boot',        __FILE__)
require File.expand_path('../../config/environment', __FILE__)

require 'rubygems'
require 'clockwork'
require 'active_record/base'
include Clockwork

handler do |job|
  
end

every(15.minutes, 'Advance_clock') { Resque.enqueue(Advance_clock) }
