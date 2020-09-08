class Client < ApplicationRecord
  def call
    require 'twilio-ruby'

    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']

    # set up a client to talk to the Twilio REST API
    @twilio = Twilio::REST::Client.new(account_sid, auth_token)
    call = @twilio.calls.create(
        to: number,
        from: "+12055397238",
        url: "http://demo.twilio.com/docs/voice.xml")
    puts call.to
  end

  def create_fake_email
    url = URI("https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/")

    domains = temp_mail_api(url)
    Faker::Internet.email(domain: domains.sample)
  end

  def read_fake_inbox(email)
    url = URI("https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/#{email}")
    temp_mail_api(url)
  end

  def register_fake_email(email)
    connect_clicksend
    api_instance = ClickSendClient::EmailMarketingApi.new
    opts = {
      email_address: ClickSendClient::EmailAddress.new(
        "email_address": email
      )
    }
    begin
      result = api_instance.allowed_email_address_post(opts)
      JSON.parse(result)
    rescue ClickSendClient::ApiError => e
      "Exception when calling EmailMarketingApi->allowed_email_address_post: #{e.response_body}"
    end
  end

  def send_verification_token(email_id)
    api_instance = ClickSendClient::EmailMarketingApi.new

    email_address_id = email_id

    begin
      result = api_instance.send_verification_token_get(email_address_id)
      JSON.parse(result)
    rescue ClickSendClient::ApiError => e
      "Exception when calling EmailMarketingApi->send_verification_token_get: #{e.response_body}"
    end
  end

  def get_inbox(email)
    md5 = Digest::MD5.hexdigest email
    url = URI("https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/#{md5}/")
    temp_mail_api(url)
  end

  def get_message(mail_id)
    url = URI("https://privatix-temp-mail-v1.p.rapidapi.com/request/one_mail/id/#{mail_id}/")
    temp_mail_api(url)['mail_text_only']
  end

  def get_token(message)
    message.match(/token=([\w*\-*]*)/)[1]
  end

  def verify_email(email_id, token)
    api_instance = ClickSendClient::EmailMarketingApi.new

    email_address_id = email_id # Integer | Allowed email address id

    activation_token = token # String | Your activation token.

    begin
      # Verify email address using verification token
      result = api_instance.verify_allowed_email_address_get(email_address_id, activation_token)
      JSON.parse(result)
    rescue ClickSendClient::ApiError => e
      "Exception when calling EmailMarketingApi->verify_allowed_email_address_get: #{e.response_body}"
    end
  end

  def send_email(from_email_id, to_name, to_email)
    api_instance = ClickSendClient::TransactionalEmailApi.new

    email = ClickSendClient::Email.new # Email | Email model

    email.to = [
      ClickSendClient::EmailRecipient.new("name": to_name, "email": to_email),
    ]

    email.from = ClickSendClient::EmailFrom.new(
      "name": Faker::Name.name,
      "email_address_id": from_email_id
    )

    # email.attachments = [
    #   ClickSendClient::Attachment.new(
    #     "disposition": "attachment",
    #     "filename": "text.txt",
    #     "content_id": "text",
    #     "type": "text/plain",
    #     "content": "ZmlsZSBjb250ZW50cw=="
    #   ),
    #   ClickSendClient::Attachment.new(
    #     "disposition": "attachment",
    #     "filename": "text2.txt",
    #     "content_id": "text2",
    #     "type": "text/plain",
    #     "content": "ZmlsZSBjb250ZW50cw=="
    #   )
    # ]

    email.subject = "Friendly reminder"

    email.body = "Lorem ipsum"

    begin
      # Send transactional email
      result = api_instance.email_send_post(email)
      JSON.parse(result)
    rescue ClickSendClient::ApiError => e
      "Exception when calling TransactionalEmailApi->email_send_post: #{e.response_body}"
    end
  end

  private

  def temp_mail_api(url, params = nil)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-host"] = 'privatix-temp-mail-v1.p.rapidapi.com'
    request["x-rapidapi-key"] = '7c042694d9mshc31f0071bff62b8p1944f7jsnea28c991a7dd'

    response = http.request(request)
    JSON.parse(response.read_body)
  end

  def connect_clicksend
    ClickSendClient.configure do |config|
      # Configure HTTP basic authorization: BasicAuth
      config.username = ENV['CLICKSEND_USER']
      config.password = ENV['CLICKSEND_PASS']
      config.api_key = ENV['CLICKSEND_KEY']
    end
  end
end
