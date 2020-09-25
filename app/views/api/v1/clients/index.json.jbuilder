json.array! @clients do |client|
  json.extract! client, :id, :name, :number, :email,
                :address_city, :address_line_1, :address_line_2,
                :address_state, :address_country, :address_post_zip
end
