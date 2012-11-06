class CreateConstellations < ActiveRecord::Migration
  def change
    create_table :constellations do |t|
      t.string  :name
      t.decimal :x, :precision => 15, :scale => 2
      t.decimal :y, :precision => 15, :scale => 2
      t.timestamps
    end
  end
end
