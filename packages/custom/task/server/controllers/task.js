'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var taskModel = mongoose.model('task');

module.exports = function(taskCtrl) {
    return {
        /**
         * Loads the risks based on id
         */
        task: function(req, res, next, id) {
            taskModel.load(id, function(err, task) {
                if (err) {
                    return next(err);
                }
                if (!task) {
                    return next(new Error('Failed to load task ' + id));
                }
                req.task = task;
                next();
            });
        },

        /**
         * Create
         */
        create: function(req, res) {
            req.assert('name', 'You must enter name').notEmpty();
            req.assert('description', 'You must enter description').notEmpty();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(400).send(errors);
            }
            var task = new taskModel(req.body);
            task.save(function(err) {
                if (err) {
                    var modelErrors = [];
                    if (err.errors) {
                        for (var x in err.errors) {
                            modelErrors.push({
                                param: x,
                                msg: err.errors[x].message,
                                value: err.errors[x].value
                            });
                        }
                        res.status(400).json(modelErrors);
                    }
                    return res.status(400);
                }
                res.json(task);
            });
        },

        /**
         * Show
         */
        show: function(req, res) {
            res.json(req.task);
        },

        /**
         * Updates the edited risk
         */
        update: function(req, res) {
            req.assert('name', 'You must enter name').notEmpty();
            req.assert('description', 'You must enter description').notEmpty();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(400).send(errors);
            }
            var task = req.task;
            task = _.extend(task, req.body);
            task.save(function(err) {
                if (err) {
                    var modelErrors = [];
                    if (err.errors) {
                        for (var x in err.errors) {
                            modelErrors.push({
                                param: x,
                                msg: err.errors[x].message,
                                value: err.errors[x].value
                            });
                        }
                        res.status(400).json(modelErrors);
                    }
                    return res.status(400);
                }
                res.json(task);
            });
        },

        /**
         * Shows all
         */
        all: function(req, res) {
            taskModel.find(function(err, tasks) {
                if (err) {
                    return res.status(400).json({
                        error: 'Cannot list the tasks'
                    });
                }
                res.json(tasks);
            });
        },

        /**
         * Shows
         */
        show: function(req, res) {
            res.json(req.task);
        },

        /**
         * Delete
         */
        destroy: function(req, res) {
            var task = req.task;
            task.remove(function(err) {
                if (err) {
                    return res.status(400).json({
                        error: 'Cannot delete the task'
                    });
                }
                res.json(task);
            });
        },
    }
};
