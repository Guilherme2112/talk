class EaeController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: { message: 'eae'} }
    end
  end
end
