#!/usr/bin/env node

var hookshot = require("hookshot");
var spawn = require("child_process").spawn;
var options = require("minimist")(process.argv.slice(2));

var branch = options.b || options.branch;
var command = options.c || options.command;
var port = options.p || options.port;

if (!branch || !command || !port) {
	console.error("--branch, --command, and --port are all required.")
	process.exit(1);
}
// Passed through to bodyParser.json()
var json_options = { limit: 1 << 20 };

hookshot('refs/heads'+ branch, command, json_options).listen(port);

console.log("Listening on port " + port + " for push events on " + branch +
".")
