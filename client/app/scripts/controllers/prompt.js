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
  .controller('PromptCtrl', ['$scope', '$http', '$log', '$state', 'Restangular',
    function ($scope, $http, $log, $state, Restangular) {

      $scope.steps = ['inspiration', 'experience', 'accomplishment'];

      $scope.promptForm = {
        'inspiration': {
          'type': 'MomentInspiration'
        },
        'experience': {
          'type': 'MomentExperience'
        },
        'accomplishment': {
          'type': 'MomentAccomplishment'
        }
      };

      $scope.handlePrompFormCompletion = function(){
        var step = $state.current.name.split('.').slice(-1)[0];
        $scope.error = null;


        if(!$scope.promptForm[step] ||
          !$scope.promptForm[step].content ||
          $scope.promptForm[step].content.length === 0){
          $scope.error = $scope.error || {};
          $scope.error.content = 'Please fill out your response to the prompt.';
        }

        if($scope.error !== null){
          return;
        }

        // Submit to API
        // Create all three moments
        // Wait for them to finish before moving on.
        $scope.createMoment($scope.promptForm[step], function(){
          $state.go('root.moments.moments');
        });
      };


      // Create a moment
      $scope.createMoment = function(momentData, cb){
        var promptPostUrl = Restangular.all('moments');
        promptPostUrl.post({
          'moment' : momentData
        }).then(function(moment){
          if(cb){
            cb();
          }
        });
      };
  }]);