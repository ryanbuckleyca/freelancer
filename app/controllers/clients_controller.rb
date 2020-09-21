class ClientsController < ApplicationController
  # TODO: add secure params
  def index
    @clients = Client.all
  end

  def show
    @client = Client.find(params[:id])
  end

  def new
    @client = Client.new
  end

  def create
    @client = Client.new(client_params)

    if @client.save
      redirect_to user_path(current_user)
    else
      render :new
    end
  end

  private

  def client_params
    params.require(:client).permit(:name, :number, :email, :address_city, :address_line_1, :address_line_2, :address_state, :address_country, :address_post_zip)
  end
end
