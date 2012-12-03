# == Schema Information
#
# Table name: planets
#
#  id                 :integer          not null, primary key
#  solar_system_id    :integer
#  name               :string(255)
#  homeworld          :boolean
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  distance_from_star :float
#

class Planet < ActiveRecord::Base
  attr_accessible :name, :distance_from_star

  belongs_to :solar_system

  validates :name, presence: true
end
