class NearearthobjectsController < ApplicationController
  before_action :set_nearearthobject, only: [:show, :update, :destroy]

  def index
    @nearearthobjects = Nearearthobject.all
    render json: @nearearthobjects, status: :ok
  end

  def show
    render json: @nearearthobject, status: :ok
  end

  def create
    @nearearthobject = Nearearthobject.new(nearreathobject_params)
    # puts @nearearthobject
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
    # puts params['nearearthobject']
    # puts '*' * 30
    # json = params.require(:nearearthobject)
    # JSON.parse(json).permit(:name, :close_approach_date, :close_approach_distance, :velocity, :size, :sizeCatagory, :pha, :distanceCatagory);
    # # return {
    # #   name: JSON.parse(json).permit(:name),
    # #   close_approach_date: JSON.parse(json).permit(:close_approach_date)
    # #   close_approach_date: JSON.parse(json).permit(:close_approach_date)
    # #   close_approach_distance: JSON.parse(json).permit(:close_approach_distance)
    # #   velocity: JSON.parse(json).permit(:velocity)
    # #   size: JSON.parse(json).permit(:size)
    # #   sizeCatagory: JSON.parse(json).permit(:sizeCatagory)
    # #   pha: JSON.parse(json).permit(:pha)
    # #   distanceCatagory: JSON.parse(json).permit(:distanceCatagory)
    # #
    # # }
    params.require(:nearearthobject).permit(:name, :close_approach_date, :close_approach_distance, :velocity, :size, :sizeCatagory, :pha, :distanceCatagory)
  end
end
