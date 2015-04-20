'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MainCtrl', ['$scope', '$modal', '$state', '$auth', '$stateParams',
   function ($scope, $modal, $state, $auth, $stateParams) {
  	var modalInstance = null;
    $scope.$state = $state;
    $scope.$watch('user', function(){
    	// If user has not filled out their info, redirect to registration
      if($scope.user && $scope.user.id){
        if(!$scope.user.name || $scope.user.name.length === 0){
          $state.go('root.register.start');
          return;
        }
      }

      // Make user initials
      if($scope.user && $scope.user.name){
        $scope.userinitials = $scope.user.name.match(/\b(\w)/g).join('').substr(0,2);
      }
    }, true);

    // Handle sign outs
    $scope.signOut = function(){
      $auth.signOut().then(function(/* resp */){
        $state.go('root.home');
      });
    };

    $scope.showLogin = function(m) {
      modalInstance = $modal.open({
        templateUrl: 'loginPopup.html',
        resolve: {
          moment: function () {
            return m;
          }
        },
        controller: ['$scope', '$state', '$modal', '$auth', function($scope, $state, $modal, $auth){
          $scope.state = 'login';
          $scope.sendingReset = false;

          $scope.setState = function(state){
            $scope.state = state;
          };

          $scope.submitLogin = function(loginForm){
            console.log(loginForm);
            $auth.submitLogin({
              email: loginForm.email,
              password: loginForm.password
            });
          };

          $scope.sendResetLogin = function(resetForm){
            $scope.sendingReset = true;
            console.log(resetForm);
            $scope.email = resetForm.email;
            $auth.requestPasswordReset(resetForm)
              .then(function(/* resp */) { 
                $scope.state = 'sent';
              })
              .catch(function(resp){
                $scope.sendingReset = false;
                console.log(resp);
              });
          };

          $scope.$on('auth:login-error', function(ev, reason) {
            $scope.error = reason.errors[0];
          });

          $scope.$on('auth:login-success', function(/* ev, reason */) {
            $state.go('root.moments.all');
            modalInstance.close();
          });
        }]
      });
    };

    $scope.showRegister = function() {
      modalInstance = $modal.open({
        templateUrl: 'registerPopup.html',
        controller: ['$scope', '$rootScope', '$state', '$modalInstance', '$auth',
         function($scope, $rootScope, $state, $modalInstance, $auth){
          $scope.registering = false;

          $scope.submitRegister = function(){
            $scope.registering = true;
            console.log($scope);
            $auth.submitRegistration($scope.registrationForm)
            .then(function(response) {
              $modalInstance.close($scope.registrationForm);
              console.log('Success');
              console.log(response);
            })
            .catch(function(err){
              $scope.registering = false;
              console.log('Error');
              console.log(err);
              $scope.errors = err.data.errors; 
            });
          };
        }]
      }).result.then(function(data){
        $scope.showThankyou(data);
      });
    };

    $scope.showPasswordReset = function(token){
      modalInstance = $modal.open({
        templateUrl: 'passwordReset.html',
        resolve: {
          token: function(){
            return token;
          }
        },
        controller: ['$scope', 'token', 'Restangular', '$modalInstance',
          function($scope, token, Restangular, $modalInstance){
          $scope.token = token;
          $scope.passwordResetForm = {
            'password': '',
            'password_confirmation': ''
          };

          console.log($scope.token);
          $scope.changePassword = function(){

            var editPassword = Restangular.one('auth', 'password');
            editPassword.user = {
              'password': $scope.passwordResetForm.password,
              'password_confirmation': $scope.passwordResetForm.password_confirmation,
              'reset_password_token': $scope.token
            };
            editPassword.put().then(function(data){
              console.log('DATA');
              console.log(data);
              if(data.errors){
                $scope.errors = data.errors;
                return;
              }

              if(data.id && data.id > 0){
                $modalInstance.close();
              }
            });
          };
        }]
      }).result.then(function(){
        $scope.passwordChangedPopup();
      });
    };

    $scope.passwordChangedPopup = function(){
      modalInstance = $modal.open({
        templateUrl: 'passwordChangedPopup.html'
      }).result.then(function(){
        $scope.showLogin();
      });
    };

    $scope.confirmedPopup = function(status){
      modalInstance = $modal.open({
        templateUrl: 'confirmedPopup.html',
        resolve: {
          status: function(){
            return status;
          }
        },
        controller: function($scope, status){
          $scope.status = status;
        }
      }).result.then(function(status){
        if(status > 0){
          $scope.showLogin();
        }
      });
    };


    $scope.showThankyou = function(data) {
      modalInstance = $modal.open({
        templateUrl: 'thanksPopup.html',
        resolve: {
          email: function(){
            return data.email;
          }
        },
        controller: function($scope, email){
          $scope.email = email;
        }
      });
    };

    if($stateParams.reset_password_token &&
        $stateParams.reset_password_token.length > 0){
      $scope.showPasswordReset($stateParams.reset_password_token);
    } else if($stateParams.confirmed &&
        $stateParams.confirmed.length > 0){
      $scope.confirmedPopup($stateParams.confirmed);
    }
  }]);
