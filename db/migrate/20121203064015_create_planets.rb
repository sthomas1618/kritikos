class CreatePlanets < ActiveRecord::Migration
  def change
    create_table :planets do |t|
      t.references  :solar_system
      t.string  :name
      t.float   :x
      t.float   :y
      t.boolean :homeworld
      t.timestamps
    end
  end
end
