'use strict';

angular.module('demoApp')
.directive('momentView', function () {
  return {
    restrict: 'E',
    scope: {
      'moment': '='
    },
    templateUrl: 'views/_moment.html',
    controller: ['$scope', 'Restangular', function($scope, Restangular) {
    	$scope.delete_moment = function(moment){
    		if(moment.id){
    			Restangular.one('moments', moment.id).remove().then(function(){
	    			$scope.moment.deleted = true;
	    		});
	    	}
    	};
    }]
  };
});