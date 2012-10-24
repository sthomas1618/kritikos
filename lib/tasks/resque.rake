require 'resque/tasks'
require 'active_record/base'

task "resque:setup" => :environment do
  Resque.before_fork = Proc.new { ActiveRecord::Base.establish_connection }
end