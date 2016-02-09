var assert          = require('assert'),
    csssc           = require('../csssc.js'),
    fullPageConfig  = require('./sample_configs/full-pages.js');

describe('configuration', function() {

    it('should have pages stats', function() {
        csssc.loadConfiguration(fullPageConfig);
        var stats = csssc.getStats();
        assert.notStrictEqual(stats.planned.pages, Object.keys(fullPageConfig.pages));
    });

})