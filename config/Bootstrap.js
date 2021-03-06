"use strict";

var async = require('async');

module.exports = function (environment, callback) {

    //Add your task name here
    var env = {
        "development": [Test],
        "beta":[Test]
        //Add more environment here
        // "development": [Test,YourTaskName, Add more task here]
    };

    function play(environment) {
        async.series(env[environment], function (err, result) {
            console.log('Booting process completed.');
            callback(err, result);
        })
    }

    play(environment);

    //Sample Task
    function Test(callback) {
        var mailOptions = {
            to: "guptkashish@gmail.com", // list of receivers
            subject: "test-1 ", // Subject line
            message: "test-2: "
        };
        callback(null,'success');
        //GlobalEvent.emit('defaultEmailNotification',mailOptions, callback);
    }

    //Task Template to create more task
    function YourTaskName(callback) {
        // ADD YOUR LOGIC HERE..
        // SO ON..
        callback(ERROR_MESSAGE, SUCCESS_MESSAGE)
    }
};

