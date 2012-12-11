class AddUserColumnToSolarSystem < ActiveRecord::Migration
  def change
    add_column :solar_systems, :user_id, :integer
  end
end
