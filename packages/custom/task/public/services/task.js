(function() {
    'use strict';

    function Task($http, $q, $resource) {
        return {
            task: $resource('/api/task/:taskId', {
                taskId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: true
                }
            })
        };
    }

    angular
        .module('mean.task')
        .factory('Task', Task);

    Task.$inject = ['$http', '$q', '$resource'];

})();
