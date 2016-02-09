/**
 * @file
 * CSSsc module for managing casperjs as a web browser driver.
 *
 * @see Spooky https://www.npmjs.com/package/spooky (Drive CasperJS from Node.js).
 * 
 */

var Spooky = require('spooky');
var spooky = false;

module.exports = {

    name: 'casperjs',
    create: function(options) {
        spooky = new Spooky({
                child: {
                    transport: 'http'
                },
                casper: options
            }, function (err) {
                if (err) {
                    e = new Error('Failed to initialize SpookyJS');
                    e.details = err;
                    throw e;
                }
            }
        );        
    },
}