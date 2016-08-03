(function() {
    'use strict';

    function Task($stateProvider) {
        $stateProvider.state('task example page', {
            url: '/task/example',
            templateUrl: 'task/views/index.html'
        }).state('task circles example', {
            url: '/task/example/:circle',
            templateUrl: 'task/views/example.html'
        });
    }

    angular
        .module('mean.task')
        .config(Task);

    Task.$inject = ['$stateProvider'];

})();
