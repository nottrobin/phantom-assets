urlTester = require('url-tester');

urlTester.runTest({
    testName: "Ubuntu Partners visual test",
    url: 'http://partners.ubuntu.com',
    viewport: [1024, 768],
    selectors: [
        '.nav-primary',
        '#context-footer'
    ]
})
