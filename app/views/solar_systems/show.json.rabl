object @sol
attributes :id, :x, :y, :constellation_id, :user_id
child(:user) { attributes :username }
child :planets do
  attributes :id, :orbital_radius, :radius
end