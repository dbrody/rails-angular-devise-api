module Api
  module V1
  	class PasswordsController < Devise::PasswordsController  

	    def update
	    	self.resource = resource_class.reset_password_by_token(resource_params)
	    	if resource.errors.empty?
	    		render json: JSON.pretty_generate(self.resource.as_json)
	    	else
	    		render json: JSON.pretty_generate({ :errors=>@self.resource.errors.full_messages }.as_json)
	    	end
	    end

	    # POST /resource/password
		def create
			print params
			self.resource = resource_class.send_reset_password_instructions(params)
			yield resource if block_given?

			if successfully_sent?(resource)
				render json: JSON.pretty_generate({}.as_json)
			else
				render json: JSON.pretty_generate({ :errors => ['Unable to send email.'] }.as_json)
			end
		end

	    def user_params
			# NOTE: Using `strong_parameters` gem
			params.required(:user).permit(:password, :password_confirmation)
		end
	end
  end
end