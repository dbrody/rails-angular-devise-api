class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::MimeResponds
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  # include ActionController::MimeResponds

  before_action :configure_permitted_parameters, if: :devise_controller?

  respond_to :json

  protected

  def configure_permitted_parameters
    # devise_parameter_sanitizer.for(:sign_up) << :confirm_success_url
    # devise_parameter_sanitizer.for(:sign_up) << :config_name

  	devise_parameter_sanitizer.for(:sign_up) << :name
  	devise_parameter_sanitizer.for(:sign_up) << :nickname
    devise_parameter_sanitizer.for(:sign_up) << :date_of_birth
    devise_parameter_sanitizer.for(:sign_up) << :where_born
    devise_parameter_sanitizer.for(:sign_up) << :finalized_registration

    devise_parameter_sanitizer.for(:account_update) << :reset_password_token
    devise_parameter_sanitizer.for(:account_update) << :name
    devise_parameter_sanitizer.for(:account_update) << :nickname
    devise_parameter_sanitizer.for(:account_update) << :date_of_birth
    devise_parameter_sanitizer.for(:account_update) << :where_born
    devise_parameter_sanitizer.for(:account_update) << :finalized_registration
  end
end
