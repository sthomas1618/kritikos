class CreateGameClocks < ActiveRecord::Migration
  def change
    create_table :game_clocks do |t|
      t.integer :turn
      t.integer :tick

      t.timestamps
    end
  end
end
