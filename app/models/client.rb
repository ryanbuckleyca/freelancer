class Client < ApplicationRecord
  def call
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @twilio = Twilio::REST::Client.new(account_sid, auth_token)
    call = @twilio.calls.create(
      twiml: '<Response><Say>Pay your god damn bill!!</Say></Response>',
      to: number,
      from: '+18588793879'
    )
    call.to
  end

  def text
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @twilio = Twilio::REST::Client.new(account_sid, auth_token)
    call = @twilio.calls.create(
      twiml: '<Response><Say>Pay your god damn bill!!</Say></Response>',
      to: number,
      from: '+18588793879'
    )
    call.to
  end

  def email_fr_clicksend
    connect_clicksend
    api_instance = ClickSendClient::EmailMarketingApi.new
    begin
      result = api_instance.allowed_email_address_get
      json = JSON.parse(result)
      verified_emails = json['data']['data'].select do |address|
        address['verified'] == 1
      end
      # TODO: get next email address that user has used
      # for now, get a random one
      # returns { "email_address_id"=>12133, "email_address"=>"invoicecollectionsteam@yahoo.com" ... }
      verified_emails.sample
    rescue ClickSendClient::ApiError => e
      "Exception when calling EmailMarketingApi->allowed_email_address_get: #{e.response_body}"
    end
  end

  def send_email_clicksend(from_email_id, to_name, to_email)
    api_instance = ClickSendClient::TransactionalEmailApi.new
    email = ClickSendClient::Email.new # Email | Email model
    email.to = [ClickSendClient::EmailRecipient.new("name": to_name, "email": to_email)]
    email.from = ClickSendClient::EmailFrom.new("name": Faker::Name.name, "email_address_id": from_email_id)
    email.subject = 'Friendly reminder'
    email.body = 'Hey Ryan, how\'s it going? Just wanted to drop you a friendly reminder about the overdue invoice. If you could go ahead and make sure you get that off to me sometime today that would be great. Hope you\'re doing well. Thanks, and warm wishes.'
    begin
      result = api_instance.email_send_post(email)
      JSON.parse(result)
    rescue ClickSendClient::ApiError => e
      "Exception when calling TransactionalEmailApi->email_send_post: #{e.response_body}"
    end
  end

  private

  def connect_clicksend
    ClickSendClient.configure do |config|
      config.username = ENV['CLICKSEND_USER']
      config.password = ENV['CLICKSEND_PASS']
      config.api_key = ENV['CLICKSEND_KEY']
    end
  end
end
