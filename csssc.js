/**
 * @file
 * CSSsc main module definition.
 */

/*
 * @private
 */
var csssconfig = {};

/**
 * @public
 * Module singleton.
 * @see http://thenodeway.io/posts/designing-singletons/#exporting-a-single-source-of-truth
 */
module.exports = {

    loadConfiguration: function(configuration) {
        csssconfig = configuration;
    },
    getPages: function() {
        return csssconfig.pages;
    }
}