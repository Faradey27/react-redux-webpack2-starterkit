/*eslint-disable*/
var path = require("path");

const outputDirectory = process.env.NIGHTWATCH_OUTPUT || "./e2eTestLog";

module.exports = {
  "src_folders" : ["test/e2e"],
  "output_folder" : outputDirectory,
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "",

  "selenium" : {
    "start_process" : !(/^win/.test(process.platform)),
    "server_path" : require("selenium-server").path,
    "log_path" : path.join(outputDirectory, "logs"),
    "host" : "127.0.0.1",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : console.log(require('chromedriver').path) && require('chromedriver').path,
      "webdriver.chrome.logfile" : '/tmp/chromedriver.log',
      "webdriver.chrome.verboseLogging" : true,
      "webdriver.ie.driver" : ""
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost:3001",
      "selenium_port"  : 4444,
      "selenium_host"  : "127.0.0.1",
      "silent": true,
      "disable_colors": true,
      "screenshots" : {
        "enabled" : true,
        "on_failure" : true,
        "path" : path.join(outputDirectory, "snapshots")
      },
      "desiredCapabilities" : {
        "browserName" : "chrome",
        "javascriptEnabled" : true,
        "acceptSslCerts" : true
      }
    }
  }
};
