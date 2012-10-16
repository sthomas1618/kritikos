class ChangeColumnsOfGameClock < ActiveRecord::Migration
  def change
    change_column :game_clocks, :turn, :integer, :default => 0, :null => false
    change_column :game_clocks, :tick, :integer, :default => 0, :null => false
  end
end
