class AddRadiusColumnToPlanet < ActiveRecord::Migration
  def change
    add_column :planets, :radius, :float
  end
end
