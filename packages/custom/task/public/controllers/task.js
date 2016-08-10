(function () {
    'use strict';

    /* jshint -W098 */

    function TaskController($scope, Global, Task, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'task'
        };
        $scope.allTasks = [];
        $scope.task = {};

        $scope.findAll = function () {
            Task.task.query({}, function (tasks) {
                $scope.allTasks = tasks;
                console.log($scope.allTasks);
            })
        };

        $scope.add = function () {
            var task = new Task.task($scope.task);
            task.$save(function (response) {
                $scope.task = {};
                $scope.allTasks.push(task);
            }, function (error) {
                $scope.error = error;
            });
        };

        $scope.delete = function (task) {
            if (task) {
                task.$remove(function (response) {
                    for (var i = 0; i < $scope.allTasks.length; i++) {
                        if (task == $scope.allTasks[i]) {
                            $scope.allTasks.splice(i, 1)
                        }
                    }
                })
            }
        };
    }


angular
    .module('mean.task')
    .controller('TaskController', TaskController);

TaskController.$inject = ['$scope', 'Global', 'Task', '$stateParams'];

})
();
