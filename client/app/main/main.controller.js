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
    $scope.chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
    $scope.login = Auth.getCurrentUser().githubProfile.login;

    $http.get('/api/v1.1/'+ $scope.login +'/repository/starcount').success(function(data){
      $scope.data = data;
    });
    //console.log(Auth.getCurrentUser());
  });
