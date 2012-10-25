require "net/http"
require "uri"

module BackboneSync
	module Rails
		NET_HTTP_EXCEPTIONS = [Timeout::Error, Errno::ETIMEDOUT, Errno::EINVAL,
                           Errno::ECONNRESET, Errno::ECONNREFUSED, EOFError,
                           Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError,
                           Net::ProtocolError]

    class Engine < ::Rails::Engine
    end

		module Faye
			
			mattr_accessor :root_address
			self.root_address = 'http://localhost:9292'

			module Observer
				def after_update(model)
					begin
						Event.new(model, :update).broadcast
					rescue *NET_HTTP_EXCEPTIONS => e
            handle_net_http_exception(e)
          end
				end

				def after_create(model)
					begin
						Event.new(model, :create).broadcast
					rescue *NET_HTTP_EXCEPTIONS => e
            handle_net_http_exception(e)
          end
				end

				def after_destroy(model)
					begin
						Event.new(model, :destroy).broadcast
					rescue *NET_HTTP_EXCEPTIONS => e
            handle_net_http_exception(e)
          end
				end

				def handle_net_http_exception(exception)
          ::Rails.logger.error("")
          ::Rails.logger.error("Backbone::Sync::Rails::Faye::Observer encountered an exception:")
          ::Rails.logger.error(exception.class.name)
          ::Rails.logger.error(exception.message)
          ::Rails.logger.error(exception.backtrace.join("\n"))
          ::Rails.logger.error("")
        end
			end

			class Event

				def initialize(model, event)
					@model = model
					@event = event
				end

				def broadcast
					Net::HTTP.post_form(uri, :message => message)
				end

				private

				def uri
					URI.parse("#{BackboneSync::Rails::Faye.root_address}/faye")
				end

				def message
					{ :channel => channel,
						:data => data 			}.to_json
				end

				def channel
					"/sync/#{@model.class.table_name}"
				end

				def data
					{ @event => { @model.id => @model.as_json } }
				end
			end
		end
	end
end
