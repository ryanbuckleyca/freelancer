class ContractsController < ApplicationController
  def index
    @contracts = Contract.where(user: current_user)
  end

  def show
    @contract = Contract.find(params[:id])
  end

  def new
    @contract = Contract.new
    @user = current_user
  end

  def create
    @contract = Contract.new(contract_params)
    @contract.user = current_user
    if @contract.save
      redirect_to user_path(current_user)
    else
      render :new
    end
  end

  private

  def contract_params
    params.require(:contract).permit(:description, :due_date, :paid, :client_id, :user_id)
  end
end
