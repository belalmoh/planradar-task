Rails.application.routes.draw do
  
  # resources :cars do
  #   method :delete do
  #   end
  # end

  post 'cars/new'
  get 'cars/getall'
  delete 'car/delete/:id', :to => 'cars#delete'
  put 'car/edit', :to => 'cars#edit'
  
  # get 'cars/index'

  # get 'cars/show'

  # get 'cars/new'

  # get 'cars/edit'

  # get 'cars/delete'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
