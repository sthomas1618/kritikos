require 'spec_helper'

describe GameClockController do

  describe "GET 'clock'" do
    it "returns http success" do
      get 'clock'
      response.should be_success
    end
  end

end
