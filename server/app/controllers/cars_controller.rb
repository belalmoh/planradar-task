class CarsController < ApplicationController

  def getall
    render :json => {:cars => Car.all}
  end


  def new
    @car = Car.new({:name => params[:name], 
                            :horsepower => params[:horsepower], 
                            :price => params[:price],
                            :cartype => params[:cartype]})

    @car.save

    render :json => {}
  end

  def edit
    @car = Car.update(params[:id], 
                      :name => params[:name], 
                      :horsepower => params[:horsepower], 
                      :price => params[:price],
                      :cartype => params[:cartype])
    render :json => {}
  end

  def delete
    @car = Car.find(params[:id])
    @car.destroy
    render :json => {}
  end

end
