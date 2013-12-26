/* global define */
define([
    'marionette',
    'app'
], function (Marionette, App) {
    'use strict';

    /**
     * Submodule which shows notebooks */
    var AppNotebooks = App.module('AppNotebook', {startWithParent: false}),
        executeAction,
        API;

    AppNotebooks.on('start', function () {
        App.mousetrap.API.restart();
        App.log('AppNotebook is started');
    });

    AppNotebooks.on('stop', function () {
        App.log('AppNotebook is stoped');
    });

    /**
     * The Router
     */
    AppNotebooks.Router = Marionette.AppRouter.extend({
        appRoutes: {
            // Notebooks
            'notebooks'     : 'listNotebooks',
            'notebooks/add' : 'addNotebook',
            'notebooks/edit/:id' : 'editNotebook',
            'notebooks/remove/:id' : 'removeNotebook',

            // Tags
            'tags/add'      : 'addTag',
            'tags/edit/:id' : 'editTag',
            'tags/remove/:id': 'removeTag'
        }
    });

    /**
     * Start application
     */
    executeAction = function (action, args) {
        App.startSubApp('AppNotebook');
        action(args);
    };

    /** * Controller
     */
    API = {
        /**
         * Methods for notebooks
         */

        // Shows list of notebooks and tags
        listNotebooks: function () {
            require(['apps/notebooks/list/controller'], function (List) {
                executeAction(new List().list);
            });
        },

        // Create notebook
        addNotebook: function () {
            require(['apps/notebooks/notebooksForm/controller'], function (Form) {
                executeAction(new Form().addForm);
            });
        },

        // Edit notebook
        editNotebook: function (id) {
            require(['apps/notebooks/notebooksForm/controller'], function (Form) {
                executeAction(new Form().editForm, {id: id});
            });
        },

        // Delete notebook
        removeNotebook: function (id) {
            require(['apps/notebooks/remove/notebook'], function (Controller) {
                executeAction(new Controller().start, {id: id});
            });
        },

        /**
         * Methods for tags
         */
        addTag: function () {
            require(['apps/notebooks/tagsForm/controller'], function (Form) {
                executeAction(new Form().addForm);
            });
        },

        editTag: function (id) {
            require(['apps/notebooks/tagsForm/controller'], function (Form) {
                executeAction(new Form().editForm, {id: id});
            });
        },

        removeTag: function (id) {
            require(['apps/notebooks/remove/tag'], function (Controller) {
                executeAction(new Controller().start, {id: id});
            });
        }
    };

    /**
     * Router events
     */


    /**
     * Register the router
     */
    App.addInitializer(function() {
        new AppNotebooks.Router({
            controller: API
        });
    });

    return AppNotebooks;
});
