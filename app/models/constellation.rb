# == Schema Information
#
# Table name: constellations
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  x          :decimal(15, 2)
#  y          :decimal(15, 2)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Constellation < ActiveRecord::Base
  #attr_accessible :title, :body
end
