class MenController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: { message: 'men'} }
    end
  end
end
