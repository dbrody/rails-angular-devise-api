# Rails-Angular-Devise-API

This repository is a starter template for a service oriented architecture web application built with a Ruby on Rails API and an Angular frontend.

It includes user authentication, bootstrap, live-reload, heroku buildpacks and more for easy development, testing and deployment.

This is a work in progress so please help contribute and share your thoughts.


## Dependencies

+ [devise\_token\_auth](https://github.com/lynndylanhurley/devise_token_auth) - For Rails user authentication
+ [API Pie](https://github.com/Apipie/apipie-rails) - Easy API documentation
+ [Compass](http://compass-style.org/) - For frontend SASS use
+ [Grunt](http://gruntjs.com/) - For lunching local environment and remote building
+ [Angular](https://angularjs.org/) - Frontend Framework
	+ [ui-router](https://github.com/angular-ui/ui-router) - Easier / better Angular routing
	+ [ng-token-auth](https://github.com/lynndylanhurley/ng-token-auth) - Angular wrapper for calls to devise\_token\_auth API
	+ [Restangular](https://github.com/mgonto/restangular) - Angular helper for calls to custom Rails API
	+ [angulartics](http://luisfarzati.github.io/angulartics/) - Angular analytics integration
	+ [angular-bootstrap](https://angular-ui.github.io/bootstrap/) - Bootstrap w/ Angular integration


## Setup

### Environment Setup
Set up your environment for this project.

1. [Install Ruby on Rails](http://guides.railsgirls.com/install/#setup-for-os-x)
2. [Install Bundler](http://bundler.io/)
3. [Install PostgreSQL](http://www.postgresql.org/download/)
4. Launch PostgreSQL App to start a PostgreSQL server

### Project Setup

Once the environment is set up, now install and configure this application.

1. Clone this repo then `cd` into the new repo folder
2. Install the gems with bundle: `bundle install`
3. Go into the frontend folder: `cd client`
4. Install NPM dependencies: `npm install`
5. Intall bower dependencies: `bower install`
6. Migrate the database: `rake db:create db:migrate`

### Running the Application

1. Make sure you have a PostgreSQL server running locally
2. Make sure you are in the client directory: `cd client`
3. Launch application: `grunt serve` **(make sure you are in /client folder)**


## Heroku

[Read more about how to create and deploy to Heroku.](./HEROKU.md)

## Email authentication

To configure it for use follow this section.

### 1. Setup model authentication requirement

Ensure :confirmable is set on the Rails User model.

To not use email authentication, you may remove this attribute from the user and adjust the UI flow accordingly.

### 2. Local Email Setup

Gmail is the main method this has been configured. It is much easier to setup.

Within /config/environment/development.rb at the bottom there are comments about authenticating for GMAIL. Uncomment the section and replace the :user_name and :password with the gmail email address and password you wish to use.

### 3. Set up heroku production variables

To set up email on heroku a few environment variables must be set.

+ URL - `heroku config:set URL=https://[app name].herokuapp.com` (Replace [app name] with your application's name.)
+ GMAIL_ACCOUNT - `heroku config:set GMAIL_ACCOUNT=<my account>@gmail.com`
+ GMAIL_PASSWORD - `heroku config:set GMAIL_PASSWORD=<my account password>`

## Additional Notes

### API Documentation

As you develop your custom application API, it is very useful to keep the endpoints documented. API Pie is a simple plug in that lets you document your code directly using the code.

For an example, while the application is running, visit: [http://localhost:9000/apipie](http://localhost:9000/apipie)

See [API Pie](https://github.com/Apipie/apipie-rails) for more details.


### Useful References

+ [APIs on Rails](http://apionrails.icalialabs.com/book/)
+ [Angular with Rails](http://www.angularonrails.com/ruby-on-rails-angularjs-single-page-application/)
+ [How to Deploy Single Page](http://www.angularonrails.com/deploy-angular-rails-single-page-application-heroku/)
+ [Rails/Angular/Devise Authentication](https://www.airpair.com/ruby-on-rails/posts/authentication-with-angularjs-and-ruby-on-rails)
