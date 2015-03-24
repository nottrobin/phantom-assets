testConfig = {
    testName: "My page visual tests",
    viewport: [1024, 768],
    selectors: [
        'body'
    ]
}

function pageTest(config) {
    // Setup PhantomCSS
    var phantomCss = require( 'phantomcss' );
    phantomCss.init({
        casper: casper,
        libraryRoot: 'node_modules/phantomcss'
    })

    // Prepare test script
    function testScript(test) {
        // The web page to parse
        casper.start('index.html')

        // Set the viewport
        casper.viewport(config.viewport[0], config.viewport[1]);

        // Test some screenshots
        casper.then(function() {
            // Test screenshots of each selector
            config.selectors.forEach(function(selector) {
                phantomCss.screenshot(selector, selector)
            })
        })

        // Finish
        casper.then(function now_check_the_screenshots() {
            // compare screenshots
            phantomCss.compareAll();
        });

        casper.run(function() {
            // And process everything
            casper.test.done()
        })
    }

    // Fire off the casper test
    casper.test.begin(
        config.testName,
        config.selectors.length,
        testScript
    )
}

pageTest(testConfig);
