const exec = require('child_process').exec;
const path = require('path');
const exampleKarmaConfig = require('../karma.conf');
const del = require('del');
const fs = require('fs');

describe('karma-structured-json-reporter Karma integration', function () {

	const execOptions = { 
		cwd: path.join(__dirname, '../'),
		env: process.env
	};

	beforeAll(function() {
		let config = {
			set: (obj) => this.jsonResultsPath = path.join(__dirname, '../', obj.jsonResultReporter.outputFile)
		};

		exampleKarmaConfig(config);

		// delete existing results file if present
		del.sync(this.jsonResultsPath);
	});

	it('should generate a full test report and write it to disk', function (done) {
		// npm test in example project should single run karma
		exec('npm test', execOptions, (error, stdout, stderr) => {

			// npm test should have failed
			expect(error).toBeDefined();
			console.log(stdout);
			console.log(stderr);
			expect(this.jsonResultsPath).toBeDefined();

			fs.readFile(this.jsonResultsPath, 'utf8', (err, data) => {
				if (err) { 
					return done.fail(err);
				}

				var results = JSON.parse(data);

				// rough check of file structure
				// other spec tests verify output
				expect(results.summary).toBeDefined();
				expect(results.browsers.length).toBe(2);
				var browser = results.browsers[0];
				expect(browser.browser).toBeDefined();
				expect(browser.results.length).toBe(3);

				done();
			})
		});
	});
});