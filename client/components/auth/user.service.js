'use strict';

angular.module('ohMyGithubApp')
  .factory('User', function ($resource) {
    return $resource('/api/v1.1/user/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
