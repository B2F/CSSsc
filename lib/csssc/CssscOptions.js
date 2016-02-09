/**
 * @file
 * CSSsc module for managing configuration options.
 */

var options = {
    clientDriver:'./lib/csssc/CssscCasper.js',
};

module.exports = {

    get: function(option) {
        return options[option];
    },
}