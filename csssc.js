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
 * Validates csssConfig.pages, adds default values and required data:
 *
 * 'name': the webpage's name reference.
 * 'url': the webpage's url used for taking screenshots.
 * 'captures': all screenshots captures for this webpage.
 */
var validatePagesConfiguration = function() {

    Object.keys(csssConfig.pages).forEach(function(page) {

        csssConfig.pages[page].name = page;

        if (csssConfig.pages[page].url == undefined) {
            throw '[ERROR] Your configuration page "' + page + '" requires an url."';
        }
        if (csssConfig.pages[page].url.indexOf('://') == -1) {
            csssConfig.pages[page].url = 'http://' + csssConfig.pages[page].url;
        }

        if (csssConfig.pages[page].captures == undefined || !Object.keys(csssConfig.pages[page].captures).length) {
            csssConfig.pages[page].captures = {
                'body':''
            }
        }

        var capturesConfig = csssConfig.pages[page].captures;

        // Pages and captures may be limited by arguments in future builds, hence recording planned pages object separately.
        stats.planned.pages[page] = {
            url: csssConfig.pages[page].url,
            captures: []
        };

        for (var c in capturesConfig) {
            csssConfig.pages[page].captures[c] = {
                selector:capturesConfig[c] || c
            }
            stats.planned.pages[page].captures.push(c);
        }
    });
}
/**
 * Validates csssConfig.viewports configuration:
 *
 * 'name': the viewports name.
 * 'height': the viewports height.
 * 'width': the viewports width.
 */
var validateViewportsConfiguration = function() {

    if (!csssConfig.viewports || typeof(csssConfig.viewports) != 'object') {
        csssConfig.viewports = {
            'default': {
                'width':1366,
                'height':768
            }
        }
    }

    Object.keys(csssConfig.viewports).forEach(function(viewportName) {
      csssConfig.viewports[viewportName].name = viewportName;
      if (typeof csssConfig.viewports[viewportName].height != 'number' ||
          typeof csssConfig.viewports[viewportName].width != 'number') {
        throw "[ERROR] Viewport height and width must be set with numbers.";
      }
    });
}

/**
 * @public
 *
 * Module singleton.
 * @see http://thenodeway.io/posts/designing-singletons/#exporting-a-single-source-of-truth
 */
module.exports = {

    initConfiguration: function(configuration) {
        csssConfig = configuration;
        validateViewportsConfiguration();
        validatePagesConfiguration();
    },
    getConfiguration: function() {
        return csssConfig;
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