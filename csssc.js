/**
 * @file
 * CSSsc main module definition.
 */

/*
 * @private
 */
var csssconfig = {};
var stats = {
    planned: {
        pages:[],
  },
};
/**
 * Validates csssconfig.pages, adds default values and required data:
 *
 * 'name': the webpage's name reference
 * 'url': the webpage's url used for taking screenshots
 * 'captures': all screenshots captures for this webpage
 */
var validatePagesConfiguration = function() {

    stats.planned.pages.forEach(function(page) {

        csssconfig.pages[page].name = page;

        if (csssconfig.pages[page].url == undefined) {
            throw '[ERROR] Your configuration page "' + page + '" requires an url."';
        }
        if (csssconfig.pages[page].url.indexOf('://') == -1) {
            csssconfig.pages[page].url = 'http://' + csssconfig.pages[page].url;
        }

        if (csssconfig.pages[page].captures == undefined || !Object.keys(csssconfig.pages[page].captures).length) {
            csssconfig.pages[page].captures = {
                'body':''
            }
        }

        var capturesConfig = csssconfig.pages[page].captures;

        for (var c in capturesConfig) {
            csssconfig.pages[page].captures[c] = {
                selector:capturesConfig[c] || c
            }
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
        csssconfig = configuration;
        stats.planned.pages = Object.keys(csssconfig.pages);
        validatePagesConfiguration();
    },
    getConfiguration: function() {
        return csssconfig;
    },
    getStats: function() {
        return stats;
    },
}