function _filename(selector) {
    selector = selector.replace('.', 'class-');
    selector = selector.replace('#', 'id-');
    return selector;
}

function runTest(config) {
    // Setup PhantomCSS
    var phantomCss = require( 'phantomcss' );
    phantomCss.init({
        casper: casper,
        libraryRoot: 'node_modules/phantomcss'
    })

    // Prepare test script
    function testScript(test) {
        // The web page to parse
        casper.start(config.url);

        // Set the viewport
        casper.viewport(config.viewport[0], config.viewport[1]);

        // Test screenshots of each selector
        casper.then(function() {
            config.selectors.forEach(function(selector) {
                phantomCss.screenshot(selector, _filename(selector));
            });
        });

        // Finish
        casper.then(function now_check_the_screenshots() {
            // compare screenshots
            phantomCss.compareAll();
        });

        casper.run(function() {
            // And process everything
            casper.test.done();
        });
    }

    // Fire off the casper test
    casper.test.begin(
        config.testName,
        config.selectors.length,
        testScript
    );
}

exports.runTest = runTest;
