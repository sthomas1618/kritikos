# == Schema Information
#
# Table name: solar_systems
#
#  id               :integer          not null, primary key
#  constellation_id :integer
#  x                :float
#  y                :float
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require 'spec_helper'

describe SolarSystem do
  pending "add some examples to (or delete) #{__FILE__}"
end
