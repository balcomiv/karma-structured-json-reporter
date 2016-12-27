const exec = require('child_process').exec;
const path = require('path');
const exampleKarmaConfig = require('../example/karma.conf');
const del = require('del');
const fs = require('fs');

describe('karma-structured-json-reporter Karma integration', function () {

	const execOptions = { 
		cwd: path.join(__dirname, '../example'),
		env: process.env
	};

	function execDone(done) {
		return (error, stdout, stderr) => {
			if (error) { 
				return done.fail(error);
			}

			console.log(stdout);
			console.log(stderr);

			done();
		};
	}

	beforeAll(function (done) {
		let config = {
			set: (obj) => this.jsonResultsPath = path.join(__dirname, '../example', obj.jsonResultReporter.outputFile)
		};

		exampleKarmaConfig(config);

		// delete existing results file if present
		del.sync(this.jsonResultsPath);

		// npm install example project
		exec('npm install', execOptions, execDone(done));
	});

	it('should generate a full test report and write it to disk', function (done) {
		// npm test in example project should single run karma
		exec('npm test', execOptions, (error) => {
			// npm test should have failed

			expect(error).toBeDefined();
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