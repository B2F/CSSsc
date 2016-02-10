/**
 * @file
 * CSSsc module for managing casperjs as a web browser driver.
 *
 * @see Spooky https://www.npmjs.com/package/spooky (Drive CasperJS from Node.js).
 * 
 */

var Spooky = require('spooky');
// Records running casperjs instances:
var spookies = [];

module.exports = {

    name: 'casperjs',
    parsePages: function(planned, eventEmitter) {

        var spooky = new Spooky({
            child: {
                transport: 'http'
            },
            casper: {
                logLevel: 'debug',
                verbose: true
            }
        }, function (err) {

            if (err) {
                e = new Error('Failed to initialize SpookyJS');
                e.details = err;
                throw e;
            }

            spooky.start('http://en.wikipedia.org/wiki/Spooky_the_Tuff_Little_Ghost');
            spooky.then(function () {
                this.emit('updates ran');
                this.emit('hello', 'Hello, from ' + this.evaluate(function () {
                    return document.title;
                }));
            });
            spooky.run();

        });
        spooky.on('updates ran', function() {
            eventEmitter.emit('updates ran');
        });
        spooky.on('error', function (e, stack) {
            console.error(e);

            if (stack) {
                console.log(stack);
            }
        });
        spookies.push(spooky);
    },
}