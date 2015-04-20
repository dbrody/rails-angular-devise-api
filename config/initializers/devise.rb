
Devise.setup do |config|
  config.navigational_formats = [:json]
  config.mailer_sender = 'yourstorybeta@gmail.com'
  config.allow_unconfirmed_access_for = 3.days
  config.mailer = "Devise::Mailer"
end
