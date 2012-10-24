web:    bundle exec rails server -p $PORT
faye:   env BUNDLE_GEMFILE=faye/Gemfile bundle exec rackup -s thin -E production faye/config.ru -p 9292
worker: bundle exec rake environment resque:work QUEUE=* VVERBOSE=1
clock:  bundle exec clockwork lib/clock.rb
