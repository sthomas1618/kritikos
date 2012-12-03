# == Schema Information
#
# Table name: planets
#
#  id              :integer          not null, primary key
#  solar_system_id :integer
#  name            :string(255)
#  x               :float
#  y               :float
#  homeworld       :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Planet < ActiveRecord::Base
  attr_accessible :name, :x, :y

  belongs_to :solar_system

  validates :name, presence: true
  validates :x, presence: true
  validates :y, presence: true
end
