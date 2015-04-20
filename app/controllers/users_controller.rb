require 'json'

class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  before_action :authenticate_user!

  api :GET, "/profile", "Get the profile of the currently logged in user"
  def profile
    @user = User.find(current_user.id)
    render json: JSON.pretty_generate([{
      user: @user.as_json
    }])
  end

end
