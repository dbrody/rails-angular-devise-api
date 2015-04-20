Apipie.configure do |config|
  config.app_name                = "YourStory"
  config.api_base_url            = "/api/v1"
  config.doc_base_url            = "/apipie"
  # where is your API defined?
  config.api_controllers_matcher = ["#{Rails.root}/app/controllers/*.rb"]
  config.reload_controllers = true
  config.validate = false

  config.app_info = "An overview of the API endpoint used by the application." # should not be "text", "another text" => ["text", "another text"]

  # # set username and password for access api
  # config.authenticate = Proc.new do
  #   authenticate_or_request_with_http_basic do |username, password|
  #     username == "dbrody@gmail.com" && password == "password"
  #   end
  # end
end
