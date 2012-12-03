class FixPlanetColumnName < ActiveRecord::Migration
  def change
  	rename_column :planets, :distance_from_star, :orbital_radius
  end
end
