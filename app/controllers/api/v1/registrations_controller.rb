module Api
  module V1
  	class RegistrationsController < Devise::RegistrationsController  
	    respond_to :json
	end
  end
end