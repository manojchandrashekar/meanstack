(function() {
    'use strict';

    function Task($http, $q) {
        return {
            name: 'task',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/task/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.task')
        .factory('Task', Task);

    Task.$inject = ['$http', '$q'];

})();
