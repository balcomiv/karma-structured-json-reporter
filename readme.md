# Karma Structured JSON Reporter

[![Build Status](https://travis-ci.org/tanenbaum/karma-structured-json-reporter.svg?branch=master)](https://travis-ci.org/tanenbaum/karma-structured-json-reporter)


This is a karma reporter that will generate a structured JSON report of the karma results.

The results are very similar to the internal karma result objects, with some tweaks. See below:

```
{
    "errors": [],
    "results": [
        {
            "description": "has a test that passes",
            "id": "spec0",
            "log": [],
            "skipped": false,
            "success": true,
            "suite": [
                "A suite"
            ],
            "time": 8,
            "executedExpectationsCount": 1
        },
        {
            "description": "has a test that fails",
            "id": "spec1",
            "log": [
                "Expected true to be false.",
                "http://localhost:9876/base/tests.js?91dda573b163812b198bbe16d044180c266573af:9:22",
                "loaded@http://localhost:9876/context.js:151:17"
            ],
            "skipped": false,
            "success": false,
            "suite": [
                "A suite"
            ],
            "time": 5,
            "executedExpectationsCount": 1
        }
    ]
}
```

If an error occurs in the browser, for example a disconnection, it will be added to the errors array.

## Installation

```
npm install --save-dev karma-structured-json-reporter
```

In your `karma.conf.js` add
 - `'karma-structured-json-reporter'` to your plugins
 - `'json-result'` to your reporters

```
plugins: [
    ...
    'karma-structured-json-reporter',
    ...
  ];

reporters: [
    'json-result'
    ...
  ],
```

## Configuration

Use the following config to output your JSON file.

```
jsonResultReporter: {
  outputFile: "karma-result.json",
  isSynchronous: true (optional, default false)
}
```

If no output file is specified the objects are logged to stdout.


------------------------

_karma-structured-json-reporter is a fork of [karma-json-result-reporter](https://github.com/Angular-cz/karma-json-result-reporter)_
