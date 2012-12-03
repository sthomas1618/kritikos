class AddDistanceColumnToPlanets < ActiveRecord::Migration
  def change
  	remove_column :planets, :x
  	remove_column :planets, :y
 		add_column :planets, :distance_from_star, :float
  end
end
