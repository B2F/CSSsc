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
 * @public
 * Module singleton.
 * @see http://thenodeway.io/posts/designing-singletons/#exporting-a-single-source-of-truth
 */
module.exports = {

    loadConfiguration: function(configuration) {
        csssconfig = configuration;
        stats.planned.pages = Object.keys(csssconfig.pages);
    },
    getStats: function() {
        return stats;
    }
}