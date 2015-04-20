module Api
  module V1
	class ConfirmationsController < Devise::ConfirmationsController
	  respond_to :json

	  def show
	    self.resource = resource_class.confirm_by_token(params[:confirmation_token])

	    if resource.errors.empty?
		    redirect_to CONFIRM_URL_OK
		else
			redirect_to CONFIRM_URL_ERROR
		end
	  end
	end
  end
end
  