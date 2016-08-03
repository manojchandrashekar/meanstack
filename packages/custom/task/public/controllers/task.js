(function() {
    'use strict';

    /* jshint -W098 */

    function TaskController($scope, Global, Task, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'task'
        };

        $scope.checkCircle = function() {
            Task.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.task')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', 'Global', 'Task', '$stateParams'];

})();
