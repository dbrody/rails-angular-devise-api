require 'json'

class MomentsController < ApplicationController

  include ActionView::Helpers::TagHelper

  before_action :set_moment, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!
  before_action :set_user, only: [:index, :create]

  resource_description { resource_id 'moments' }

  # GET /moments
  # GET /moments.json
  api :GET, "/moments", "Get all moments of the currently authenticated user."
  def index
    render json: @user.moments
  end

  # GET /moments/1
  # GET /moments/1.json
  def show
    render json: User.find(params[:id])
  end

  # GET /moments/new
  def new
    @moment = Moment.new
  end

  # GET /moments/1/edit
  def edit
  end

  # POST /moments
  # POST /moments.json
  api :POST, "/moments", "Create moment for the currently authenticated user."
  def create
    if !@user
      render json: "Unable to find authenticated user."
      return
    end

    @moment = Moment.new(moment_params)

    if @moment.save
      @user.moments << @moment
      render json: @moment
    else
      render json: @moment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /moments/1
  # PATCH/PUT /moments/1.json
  def update
    respond_to do |format|
      if @moment.update(moment_params)
        format.html { redirect_to @moment, notice: 'Moment was successfully updated.' }
        format.json { render :show, status: :ok, location: @moment }
      else
        format.html { render :edit }
        format.json { render json: @moment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /moments/1
  # DELETE /moments/1.json
  def destroy
    @moment.destroy
    if @moment.user_id == current_user.id
      render json: @moment
    else
      render json: ["Invalid authorization"].as_json,  status: :unprocessable_entity
    end
  end

  private

    def set_user
      @user = User.find(current_user.id)
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_moment
      @moment = Moment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def moment_params
      params.require(:moment).permit(:type, :content_type, :content)
    end
end
