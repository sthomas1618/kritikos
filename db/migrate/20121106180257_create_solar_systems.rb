class CreateSolarSystems < ActiveRecord::Migration
  def change
    create_table :solar_systems do |t|
    	t.references  :constellation
      t.float :x
      t.float :y
      t.timestamps
    end
  end
end
