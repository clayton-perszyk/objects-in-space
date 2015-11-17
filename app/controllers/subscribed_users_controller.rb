class SubscribedUsersController < ApplicationController
  def index
    @subscribers = SubscribedUser.all
    render json: @subscribers
  end

  def create
    @subscriber = SubscribedUser.new({endpoint: sub_params})

    if @subscriber.save
      render json: @subscriber, status: :created
    else
      render json: @subscriber.errors, status: :unprocessable_entity
    end
  end

  private

  def sub_params
    params.require(:endpoint)
  end
end
