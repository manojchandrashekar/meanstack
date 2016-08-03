(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Task, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/task/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

        app.get('/api/task/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/task/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/task/example/render', function(req, res) {
            Task.render('index', {
                package: 'task'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });

        var taskctrl = require('../controllers/task')(Task);

        // APIS
        app.route('/api/task')
            .post(taskctrl.create)
            .get(taskctrl.all);

        app.route('/api/task/:taskId')
            .get(taskctrl.show)
            .put(taskctrl.update)
            .delete(taskctrl.destroy);

        app.param('taskId', taskctrl.task);
    };
})();