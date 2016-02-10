var assert          = require('assert'),
    csssc           = require('../csssc.js'),
    fullPageConfig  = require('./configuration_samples/full-pages.js');

describe('CSSsc configuration', function() {

    csssc.init(fullPageConfig);
    var stats = csssc.getStats();

    it('should generate stats', function() {
        assert.notStrictEqual(stats.planned.pages, Object.keys(fullPageConfig.pages));
    });

    it('should have default body selector', function() {
        assert.equal(stats.planned.pages.bodyDefault.captures.body.selector, 'body');
    });

    it('should have named selectors', function() {
        assert.equal(stats.planned.pages.bodyCapture.captures.fullPage.selector, 'body');
    });

    it('should define a default client driver', function() {
        assert.equal(csssc.getOpt('clientDriver'), './lib/csssc/CssscCasper.js');
    });

    it('should define a default viewport', function() {
        assert.ok(stats.planned.viewports.default.width);
    });
})

describe('CSSsc updates', function() {
    this.timeout(5000);
    var clientDriverRan = false;
    before(function(done) {
        csssc.on('updates ran', function() {
            clientDriverRan = true;
            done();
        });
        csssc.updateScRefs();
    });
    it('should run', function() {
        assert.equal(clientDriverRan, true);
    });
})