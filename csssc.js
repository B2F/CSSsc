/**
 * @file
 * CSSsc main module definition.
 */

/*
 * @private
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();
var options = require('./lib/csssc/CssscOptions.js');
var clientDriver = require(options.get('clientDriver'));
var csssConfig = {};
var stats = {
    planned: {
        pages: {},
        viewports:[],
  },
};
/**
 * Prepare planned pages for parsing:
 *
 * 'name': the webpage's name reference.
 * 'url': the webpage's url used for taking screenshots.
 * 'captures': all screenshots captures for this webpage.
 */
var planPages = function() {

    Object.keys(csssConfig.pages).forEach(function(page) {

        if (csssConfig.pages[page].url == undefined) {
            throw '[ERROR] Your configuration page "' + page + '" requires an url."';
        }
        if (csssConfig.pages[page].url.indexOf('://') == -1) {
            csssConfig.pages[page].url = 'http://' + csssConfig.pages[page].url;
        }

        // Pages and captures may be limited by arguments in future builds, hence recording planned pages object separately.
        stats.planned.pages[page] = {
            url: csssConfig.pages[page].url,
            captures: {}
        };

        var capturesConfig = {'body': ''}

        if (csssConfig.pages[page].captures != undefined && Object.keys(csssConfig.pages[page].captures).length) {
            capturesConfig = csssConfig.pages[page].captures;
        }

        for (var c in capturesConfig) {
            stats.planned.pages[page].captures[c] = {
                selector:capturesConfig[c] || c
            }
        }
    });
}
/**
 * Prepare planned viewports for parsing:
 *
 * 'name': the viewports name.
 * 'height': the viewports height.
 * 'width': the viewports width.
 */
var planViewports = function() {

    stats.planned.viewports = {
        'default': {
            'width':1366,
            'height':768
        }
    }

    if (csssConfig.viewports || typeof(csssConfig.viewports) == 'object') {
        stats.planned.viewports = {};
        Object.keys(csssConfig.viewports).forEach(function(viewportName) {
            stats.planned.viewports[viewportName] = csssConfig.viewports[viewportName];
            if (typeof csssConfig.viewports[viewportName].height != 'number' ||
                typeof csssConfig.viewports[viewportName].width != 'number') {
                throw "[ERROR] Viewport height and width must be set with numbers.";
            }
        });
    }
}

/**
 * @public
 *
 * Module singleton.
 * @see http://thenodeway.io/posts/designing-singletons/#exporting-a-single-source-of-truth
 */
module.exports = {

    init: function(configuration) {
        csssConfig = configuration;
        planViewports();
        planPages();
    },

    getStats: function() {
        return stats;
    },
    getOpt: function(option) {
        return options.get(option);
    },
    getClient: function() {
        return clientDriver;
    },

    emit: function(event) {
        eventEmitter.emit(event);
    },
    on: function(event, callback) {
        eventEmitter.on(event, callback);
    },

    /**
     * Updates Screenshots captures References.
     */
    updateScRefs: function() {
        clientDriver.parsePages(stats.planned, eventEmitter);
    }
}