'use strict';

angular.module('demoApp')
.directive('registrationInput', function () {
  return {
    restrict: 'E',
    scope: {
    	'type': '@',
    	'placeholder': '@',
    	'model': '=',
    	'title': '@',
    	'field': '=',
    	'error': '=',
    	'errorstr': '@'
    },
    templateUrl: 'views/user_registrations/basic_field.html',
    controller: function($scope) {
      $scope.placeholder = $scope.title;
    }
  };
});