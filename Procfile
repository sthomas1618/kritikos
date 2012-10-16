web: bundle exec rails server -p $PORT
worker: bundle exec rake environment resque:work QUEUE=* VVERBOSE=1
clock: bundle exec clockwork lib/clock.rb