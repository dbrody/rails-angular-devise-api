// client/app/scripts/controllers/groups.js

'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('ProfileCtrl', ['$scope', '$http', '$log', 'Restangular',
    function ($scope, $http, $log, Restangular) {

    Restangular.all('profile').getList().then(function(data){
      console.log('Profile:');
      console.log(data[0]);
      $scope.profile = data[0];
    });


  }]);