# frozen_string_literal: true

# Folks who don't value the time of freelancers
class Client < ApplicationRecord
  has_many :contracts
  has_many :users, through: :contracts

  def send_call
    connect_twilio
    call = @twilio.calls.create(
      twiml: '<Response><Say>Pay your god damn bill!!</Say></Response>',
      to: number,
      from: '+18588793879'
    )
    call.to
  end

  def send_text
    connect_twilio
    message = @twilio.messages.create(
      body: 'Yooooo, pay yo mothafucken invoice beotch!',
      from: '+18588793879',
      to: number
    )
    message.sid
  end

  def send_email
    api_instance = ClickSendClient::TransactionalEmailApi.new
    email_to_send = ClickSendClient::Email.new # Email | Email model
    email_to_send.to = [ClickSendClient::EmailRecipient.new("name": name, "email": email)]
    email_to_send.from = ClickSendClient::EmailFrom.new("name": Faker::Name.name, "email_address_id": emails_fr_clicksend['email_address_id'])
    email_to_send.subject = 'Friendly reminder'
    email_to_send.body = 'Hey Ryan, how\'s it going? Just wanted to drop you a friendly reminder about the overdue invoice. If you could go ahead and make sure you get that off to me sometime today that would be great. Hope you\'re doing well. Thanks, and warm wishes.'
    begin
      result = api_instance.email_send_post(email_to_send)
      JSON.parse(result)
    rescue ClickSendClient::ApiError => e
      "Exception when calling TransactionalEmailApi->email_send_post: #{e.response_body}"
    end
  end

  def letter_cost(file)
    connect_clicksend
    api_instance = ClickSendClient::PostLetterApi.new
    post_letter = ClickSendClient::PostLetter.new(
      'file_url': upload_file_to_clicksend(file),
      'colour': 0,
      'recipients': [
        {
          'return_address_id': 0,
          'schedule': 0,
          'address_postal_code': 'H2W 1Y7',
          'address_country': 'Canada',
          'address_line_1': '4107 St. Laurent Blvd',
          'address_state': 'Quebec',
          'address_name': 'Ryan Buckley',
          'address_line_2': 'Apt 2',
          'address_city': 'Montreal'
        }
      ],
      'template_used': 0,
      'duplex': 0,
      'priority_post': 0,
      'source': 'sdk'
    )

    begin
      result = api_instance.post_letters_price_post(post_letter)
      JSON.parse(result)
    rescue ClickSendClient::ApiError => e
      "Exception when calling PostLetterApi->post_letters_price_post: #{e.response_body}"
    end
  end

  private

  def upload_file_to_clicksend(file)
    api_instance = ClickSendClient::UploadApi.new

    # Open the file you wish to encode
    data = File.open(file).read

    # Encode the puppy
    encoded = Base64.encode64(data)

    # UploadFile | Your file to be uploaded
    upload_file = ClickSendClient::UploadFile.new(
      content: encoded
    )

    convert = 'post' # String |

    begin
      # Upload File
      result = api_instance.uploads_post(upload_file, convert)
      JSON.parse(result)['data']['_url']
    rescue ClickSendClient::ApiError => e
      "Exception when calling UploadApi->uploads_post: #{e.response_body}"
    end
  end

  def emails_fr_clicksend
    connect_clicksend # only needs to happen once, i think
    api_instance = ClickSendClient::EmailMarketingApi.new
    begin
      result = api_instance.allowed_email_address_get
      json = JSON.parse(result)
      verified_emails = json['data']['data'].select do |email|
        email['verified'] == 1
      end
      # TODO: get next email address that user has used
      # for now, get a random one
      # returns { "email_address_id"=>12133, "email_address"=>"invoicecollectionsteam@yahoo.com" ... }
      verified_emails.sample
    rescue ClickSendClient::ApiError => e
      "Exception when calling EmailMarketingApi->allowed_email_address_get: #{e.response_body}"
    end
  end

  def connect_twilio
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @twilio = Twilio::REST::Client.new(account_sid, auth_token)
  end

  def connect_clicksend
    ClickSendClient.configure do |config|
      config.username = ENV['CLICKSEND_USER']
      config.password = ENV['CLICKSEND_PASS']
      config.api_key = ENV['CLICKSEND_KEY']
    end
  end
end
