# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u = User.create!({
	:email => 'test@gmail.com',
	:password => 'password', 
	:confirmed_at => Time.zone.now,
	:password_confirmation => 'password' , 
	:uid => 'test@gmail.com', 
	:provider => "email" })
moment = MomentInspiration.new({ :content => "I can do so much with a powerful starter kit!" })
moment1 = MomentExperience.new({ :content => "I'm about to make a web application."})
moment2 = MomentAccomplishment.new({ :content => "I've set up my web application environment!" })
u.moments << moment
u.moments << moment1
u.moments << moment2