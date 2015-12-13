'use strict';

angular.module('ohMyGithubApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  })

  .controller('DrawCtrl', function ($scope, $http, Auth){

    $scope.showGraph = false;

    if(Auth.isLoggedIn()){

      $scope.showGraph = true;

      $scope.login = Auth.getCurrentUser().githubProfile.login;

      $http.get('/api/v1.1/'+ $scope.login +'/repository/starcount').success(function(data){
        $scope.repository = data;
      });

      $scope.userLanguageData = {columns: [], type: 'pie'};

      $http.get('/api/v1.1/' + $scope.login + '/language/eachline').success(function(data){
        if(data !== null) {
          data.forEach(function (obj) {
            $scope.userLanguageData.columns.push([obj.name, obj.line]);
          })
        }
        $scope.userLanguageChart = c3.generate({
          bindto: '#chart',
          data: $scope.userLanguageData
        });
      });



    }
  });
