'use strict';

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
requirejs.config({
    baseUrl: './',
    paths: {
        app: 'js/app',
        jquery: 'js/lib/jquery-3.0.0.min',
        backbone: 'js/lib/backbone.min',
        bootstrap: 'js/lib/bootstrap'
    }
});

require(['app',], function (App) {
    new App();
});
