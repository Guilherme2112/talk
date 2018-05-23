class KkController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: { message: 'kk'} }
    end
  end
end
