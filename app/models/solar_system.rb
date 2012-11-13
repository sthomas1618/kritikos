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

class SolarSystem < ActiveRecord::Base
	attr_accessible :x, :y

	belongs_to :constellation

  validates :x, presence: true
  validates :y, presence: true
end
