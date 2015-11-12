class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @user = User.all
    render json: @user, status: :ok
  end

  def show
    render json: @user, status: :ok
  end

  def create
    @user = Nearearthobject.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      renser json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    render json: @user, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :name, :email, :password)
  end
end
