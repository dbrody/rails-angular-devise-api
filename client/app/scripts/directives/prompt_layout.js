'use strict';

angular.module('demoApp')
.directive('promptLayout', function () {
  return {
    restrict: 'E',
    scope: {
        'supertitle': '@',
      	'title': '@',
        'subtitle': '@',
        'error': '=',
        'model': '='
    },
    templateUrl: 'views/prompts/prompt_layout_partial.html',
    controller: function($scope) {
      $scope.placeholder = $scope.title;
    }
  };
});