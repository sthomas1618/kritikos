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
#  user_id          :integer
#

class SolarSystem < ActiveRecord::Base
  belongs_to :user
	belongs_to :constellation
  has_many :planets

  validates :x, presence: true
  validates :y, presence: true
end
