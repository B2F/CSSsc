/**
 * @file
 * CSSsc module for managing configuration options.
 */

var options = {
    browserClient:'casperjs',
};

module.exports = {

    get: function(option) {
        return options[option];
    },
}