// client/app/scripts/controllers/groups.js
/* global _: false */

'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MomentsCtrl', ['$scope', '$http', '$log', '$state', '$modal', 'Restangular',
    function ($scope, $http, $log, $state, $modal, Restangular) {

      var $outside_scope = $scope;
    $scope.$state = $state;

    $scope.createMoment = function(momentForm){
      momentForm.content_type = 1;
      momentForm.moment_type = 1;
      $log.log(momentForm);
      $http.post('/api/v1/moments', { moment: momentForm } )
      .success(function (data /*, status, headers, config */) {
        $log.log(data);
      });
    };


    $scope.showMoment = function(moment){
      return true;
    };

    $scope.toggleMoment = function(m) {
      $modal.open({
        templateUrl: 'views/_momentModal.html',
        controller: 'MomentModalCtrl',
        resolve: {
          moment: function () {
            return m;
          }
        }
      });
    };

    $scope.numInCategory = function(category){
      if(!$scope.moments){
        return 0;
      }
      var num = 0;
      for(var i = 0; i < $scope.moments.length; i++){
        console.log($scope.moments[i]);
        console.log(category);
        if(!$scope.moments[i].deleted &&
            $scope.moments[i].type === category){
          num++;
        }
      }
      return num;
    };

  Restangular.all('moments').getList().then(function(moments){
    $scope.moments = moments;
    $scope.calculateActivityStats();
  });

  }]);

angular.module('demoApp').controller('MomentModalCtrl', function ($scope, $modalInstance, moment) {
  $scope.moment = moment;
});
