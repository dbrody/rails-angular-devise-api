# Heroku

[README](./README.md) > Heroku

This shows how to create and deploy to a Heroku instance.

This setup uses multiple buildpacks to individually build the Angular app and then the Rails app. It will install all front dependencies from the /client folder and build it into the ../public folder for rails using [this buildpack](https://github.com/jasonswett/heroku-buildpack-nodejs-grunt-compass). Then it will run the default ruby buildpack. Using this method prevent us from needing to add the public folder or any compiled frontend code to our repository.

## New Remote Heroku Web Application

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command#installing-the-heroku-cli)
2. Create new app: `heroku create <app-name>`
3. Configure to multiple buildpacks: `heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git`
4. Set Heroku build environment: `heroku config:set NODE_ENV=production`
5. Set Heroku Rails environment: `heroku config:set RACK_ENV=production`
6. Set Email Account: `heroku config:set GMAIL_ACCOUNT=<my account>@gmail.com`
7. Set Email Password: `heroku config:set GMAIL_PASSWORD=<my account password>`
6. Set Heroku URL for email links: `heroku config:set URL=https://[app name].herokuapp.com`


## Deploy to Heroku

1. Move to the repository's root directory
2. Deploy to Heroku: `git push heroku master`
3. Update Heroky DB: `heroku run rake db:migrate`
4. Open web application: `heroku open`


## Database Migration on Heroku

### Just Update / Migrate

1. Migrate DB: `heroku run rake db:migrate`

### Reset entire DB

1. Drop entire database: `heroku pg:reset DATABASE_URL`
1. Rebuild / migrate db: `heroku run rake db:migrate`

