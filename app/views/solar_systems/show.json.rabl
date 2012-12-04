object @sol
attributes :id, :x, :y, :constellation_id
child :planets do
  attributes :id, :orbital_radius
end