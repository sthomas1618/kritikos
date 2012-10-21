web: bundle exec rails server -p $PORT
worker: bundle exec rake environment resque:work QUEUE=* VVERBOSE=1
clock: bundle exec clockwork lib/clock.rb
bundle exec rackup $BASEDIR/config.ru -s thin -E production


pubsub: bundle exec thin -p $PORT -e $RACK_ENV -R ./faye/config.ru start