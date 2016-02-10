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
            spooky.start('about:blank');

            Object.keys(planned.pages).forEach(function(p) {
                Object.keys(planned.viewports).forEach(function(v) {
console.log(spooky);
                    spooky.viewport(v.width, v.height);

                    // Throw on Client (4xx) or Server (5xx) errors.
                    if (typeof spooky.currentHTTPStatus !== 'number' || spooky.currentHTTPStatus > 400) {
                      switch (spooky.currentHTTPStatus) {
                        case null:
                          throw "[ERROR] Can't access " + planned.pages[p].url + ". Check the website url and your internet connexion.";
                          break;
                        default:
                          throw "[ERROR] Response code for " + planned.pages[p].url + " was " + spooky.currentHTTPStatus;
                      }
                    }                    

                    spooky.thenOpen(planned.pages[p].url);
                    spooky.then(function () {
                        this.emit('casper event', this.evaluate(function () {
                            return document.title;
                        }));
                    });
                });
            });
            spooky.then(function () {
                this.emit('casper event', 'updates ran');
            });
            spooky.run();
        });
        spooky.on('casper event', function(arg) {
            console.log(arg);
            eventEmitter.emit(arg);
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