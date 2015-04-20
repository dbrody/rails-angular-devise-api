'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('UserSessionsCtrl', ['$scope', function ($scope) {
  	$scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = reason.errors[0];
    });
  }]);