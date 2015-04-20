// client/app/scripts/controllers/user_registrations.js

'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:UserRegistrationsCtrl
 * @description
 * # UserRegistrationsCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('UserRegistrationsCtrl',
    ['$scope', '$auth', '$http', '$log', '$state',
    function ($scope, $auth, $http, $log, $state) {

    $scope.error = null;
    $scope.registrationForm = {
      'id': $scope.user.id,
      'finalized_registration': 2,
      'email': $scope.user.email
    };

    $scope.$watch('user', function(){
      $scope.registrationForm.name = $scope.user.name;
      $scope.registrationForm.nickname = $scope.user.nickname;
      $scope.registrationForm.date_of_birth = $scope.user.date_of_birth;
      $scope.registrationForm.where_born = $scope.user.where_born;
      console.log($scope.registrationForm);
    }, true);

    $scope.validateBasics = function(){
      $scope.registrationForm.email = $scope.user.email;
      $auth.updateAccount($scope.registrationForm)
        .then(function() {
          $state.go('root.moments.all');
        })
        .catch(function(err){
          $scope.error = {
            full_messages: []
          };
          if(err.data.errors){
            for(var error_field in err.data.errors){
              if(['finalized_registration', 'full_messages'].indexOf(error_field) >= 0){
                continue;
              }
              $scope.error[error_field] = [
                error_field.charAt(0).toUpperCase() + 
                error_field.slice(1) + ' ' + err.data.errors[error_field][0]
              ];
              $scope.error.full_messages.push(error_field + ' : ' + err.data.errors[error_field][0]);  
            }
          } else {
            $scope.error.full_messages.push('Please fill in your email address.');
            $scope.error.email = ['Please fill in your email address.'];
          }
          console.log($scope.error);
        });
    };
  }]);
