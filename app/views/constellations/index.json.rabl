collection @constellations
attributes :id, :name, :x, :y
child :solar_systems do
  attributes :id, :x, :y, :user_id
  child(:user) { attributes :username }
end