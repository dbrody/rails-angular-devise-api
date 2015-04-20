'use strict';
/* global ga: false */
/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * # demoApp
 *
 * Main module of the application.
 */
var app = angular.module('demoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-token-auth',
    'restangular',
    'ui.router',
    'textAngular',
    'ui.utils',
    'ui.bootstrap',
    'angulartics',
    'angulartics.google.analytics'
  ]);

app.config(function ($provide, $stateProvider, $urlRouterProvider, $authProvider, RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/moments/all');

  // Now set up the states
  $stateProvider
    .state('root', {
      templateUrl: 'views/index.html',
      controller: 'MainCtrl'
    })
    .state('root.home', {
      url: '/?reset_password_token&confirmed',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('root.profile', {
      url: '/profile',
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })

    // Moments View
    .state('root.moments', {
      templateUrl: 'views/moments/index.html',
      controller: 'MomentsCtrl',
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }]
      }
    })
    .state('root.moments.all', {
      url: '/moments/all',
      templateUrl: 'views/moments/all.html'
    })
    .state('root.moments.moments', {
      url: '/moments/moments',
      templateUrl: 'views/moments/by_moment.html'
    })

    // States for prompts
    .state('root.prompt', {
      templateUrl: 'views/prompts/main.html',
      controller: 'PromptCtrl',
      resolve: {
        auth: ['$auth', function($auth) {
          return $auth.validateUser();
        }]
      }
    })
    .state('root.prompt.inspiration', {
      url: '/prompt/inspiration',
      templateUrl: 'views/prompts/inspiration.html'
    })
    .state('root.prompt.experience', {
      url: '/prompt/experience',
      templateUrl: 'views/prompts/experience.html'
    })
    .state('root.prompt.accomplishment', {
      url: '/prompt/accomplishment',
      templateUrl: 'views/prompts/accomplishment.html'
    })

    // States for registration
    .state('root.register', {
      templateUrl: 'views/user_registrations/new.html',
      controller: 'UserRegistrationsCtrl'
    })
    .state('root.register.start', {
      url: '/register',
      templateUrl: 'views/user_registrations/basics.html',
      controller: 'UserRegistrationsCtrl'
    })

    // Sign In State
    .state('root.sign_in', {
      url: '/sign_in',
      templateUrl: 'views/user_sessions/new.html',
      controller: 'UserSessionsCtrl'
    });

  // Configure authentication endpoints / prefix
  $authProvider.configure({
      apiUrl: '/api/v1'
  });


  // Used for customizing wysiwyg toolbar options for moment content fields
  $provide.decorator('taOptions', ['taRegisterTool', '$delegate',
    function(taRegisterTool, taOptions){
    // Customize textAngular's toolbar

    /*
    taOptions.toolbar = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
        ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
        ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
    ];
    */

    taOptions.toolbar = [
      ['html', 'insertImage','insertLink', 'insertVideo'],
      //['h1', 'h3', 'h6', 'quote'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol']
    ];
    return taOptions;
  }]);
});



app.run(['$rootScope', '$location', '$state', '$analytics', function($rootScope, $location, $state, $analytics) {

  $rootScope.$on('auth:logout-success', function(/* ev , reason */) {
    $state.go('root.home');
  });

  $rootScope.$on('auth:login-success', function(/*ev , reason */) {
    $analytics.pageTrack('/user/login/' + $rootScope.user.id + '/' + $rootScope.user.name);
    $analytics.eventTrack('/user/login/' + $rootScope.user.id + '/' + $rootScope.user.name);
  });

  $rootScope.$on('auth:validation-success', function(/* ev, reason */) {
    if(!$rootScope.user.name){
      $state.go('root.register.start');
    } else {
      // Set userID for analytics tracking
      ga('set', 'userId', $rootScope.user.id);
      $analytics.pageTrack('/reload/' + $rootScope.user.id + '/' + $rootScope.user.name);
      $analytics.eventTrack('/reload/' + $rootScope.user.id + '/' + $rootScope.user.name);
    }
  });

  $rootScope.$on('auth:validation-error', function(/* ev, reason */) {
    console.log('Bad validation.');
    $state.go('root.home');
  });
}]);