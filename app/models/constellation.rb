# == Schema Information
#
# Table name: constellations
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  x          :float
#  y          :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#


class Constellation < ActiveRecord::Base
	attr_accessible :name

	has_many :solar_systems

	charted_by :x, :y

  validates :x, presence: true
  validates :y, presence: true
end
