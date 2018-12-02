class ApplicationController < ActionController::Base
  respond_to :html, :json
  #protect_from_forgery with: :null_session, prepend: true
  skip_before_action :verify_authenticity_token
end
