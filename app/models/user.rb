# frozen_string_literal: true

# Freelancers
class User < ApplicationRecord
  has_many :contracts
  has_many :clients, through: :contracts
  validates :name, :email, :address_city, :address_line_1, :address_state,
            :address_country, :address_post_zip, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
