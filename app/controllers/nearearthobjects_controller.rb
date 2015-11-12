class NearEarthObjectsController < ApplicationController
  before_action :set_nearerathobject, only: [:show, :update, :destroy]

  def index
    @nearreathobjects = Nearearthobject.all
    render json: @nearreathobjects, status: :ok
  end

  def show
    render json: @nearreathobject, status: :ok
  end

  def create
    @nearreathobject = Nearearthobject.new(nearreathobject_params)

    if @nearreathobject.save
      render json: @nearreathobject, status: :created
    else
      render json: @nearreathobject.errors, status: :unprocessable_entity
    end
  end

  def update
    if @nearreathobject.update(nearreathobject_params)
      renser json: @nearreathobject, status: :ok
    else
      render json: @nearreathobject.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @nearreathobject.destroy
    render json: @nearreathobject, status: :ok
  end

  private

  def set_nearerathobject
    @nearreathobject = Nearearthobject.find(params[:id])
  end

  def nearreathobject_params
    params.require(:nearreathobject).permit(:name, :close_approach_date, :close_approach_distance, :velocity, :size)
  end
end
