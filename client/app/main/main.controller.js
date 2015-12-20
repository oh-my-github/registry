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

      $http.get('/api/v1.1/' + $scope.login + '/language').success(function(data){
        if(data !== null) {
          data.forEach(function (obj) {
            $scope.userLanguageData.columns.push([obj.name, obj.line]);
          })
        }
        $scope.userLanguageChart = c3.generate({
          bindto: '#chart',
          data: $scope.userLanguageData,
          tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
              var $$ = this, config = $$.config,
                titleFormat = config.tooltip_format_title || defaultTitleFormat,
                nameFormat = config.tooltip_format_name || function (name) { return name; },
                valueFormat = config.tooltip_format_value || defaultValueFormat,
                text, i, title, value, name, bgcolor;
              for (i = 0; i < d.length; i++) {
                if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                }

                name = nameFormat(d[i].name);
                value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
                text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                text += "<td class='value'>" + value + "</td>";
                text += "<td class='value'>" + d[i].value + " lines" + "</td>";
                text += "</tr>";
              }
              return text + "</table>";
            }
          }
        });
      });



    }
  });
