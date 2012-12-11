# == Schema Information
#
# Table name: planets
#
#  id              :integer          not null, primary key
#  solar_system_id :integer
#  name            :string(255)
#  homeworld       :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  orbital_radius  :float
#

class Planet < ActiveRecord::Base
  attr_accessible :name, :orbital_radius, :radius

  belongs_to :solar_system

  validates :orbital_radius, presence: true
  validates :radius, presence: true
end
