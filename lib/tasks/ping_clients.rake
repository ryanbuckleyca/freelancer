# frozen_string_literal: true

namespace :clients do
  desc 'Call, email, text, write to clients!'
  task ping_all: :environment do
    Client.all.each do |client|
      client.send_call
      client.send_text
      client.send_email
    end
  end
end
