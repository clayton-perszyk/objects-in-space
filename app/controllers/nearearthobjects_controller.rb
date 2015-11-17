class NearearthobjectsController < ApplicationController
  before_action :set_nearearthobject, only: [:show, :update, :destroy]

  def todays_neos
    @neos = Nearearthobject.where(close_approach_date: "2016-02-18 00:00:00")
    render json: @neos, status: :ok
  end

  def index
    @nearearthobjects = Nearearthobject.all
    render json: @nearearthobjects, status: :ok
  end

  def show
    render json: @nearearthobject, status: :ok
  end

  def create
    @nearearthobject = Nearearthobject.new(nearreathobject_params)

    if @nearearthobject.save
      render json: @nearearthobject, status: :created
    else
      render json: @nearearthobject.errors, status: :unprocessable_entity
    end
  end

  def update
    if @nearearthobject.update(nearreathobject_params)
      renser json: @nearearthobject, status: :ok
    else
      render json: @nearearthobject.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @nearreathobject.destroy
    render json: @nearreathobject, status: :ok
  end

  private

  def set_nearearthobject
    @nearearthobject = Nearearthobject.find(params[:id])
  end

  def nearreathobject_params
    params.require(:nearearthobject).permit(:name, :close_approach_date, :close_approach_distance, :velocity, :size)
  end
end
