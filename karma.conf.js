process.env.CHROME_BIN = require("puppeteer").executablePath();
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["parallel", "jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-parallel"),
      require("karma-junit-reporter"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-spec-reporter"),
    ],
    parallelOptions: {
      executors: 1,
      shardStrategy: "round-robin",
    },
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false,
        timeoutInterval: 10000, // Increasing this to avoid async failure error in few unit tests
      },
    },
    browserDisconnectTimeout: 20000,
    browserDisconnectTolerance: 3,
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      reports: ["html", "lcov", "cobertura"],
      fixWebpackSourcePaths: true,
    },
    reporters: ["junit", "progress", "kjhtml", "spec"],
    junitReporter: {
      outputDir: require("path").join(__dirname, "../coverage"), // results will be saved as $outputDir/$browserName.xml
      outputFile: "junit.xml", // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: "", // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null, // use '1' if reporting to be per SonarQube 6.2 XML format
    },
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false, // print the time elapsed for each spec
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    browsers: ["Chrome", "Chrome_no_sandbox"],
    customLaunchers: {
      Chrome_no_sandbox: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--headless",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-translate",
          "--disable-extensions",
          "--disable-web-security",
          "--window-size=1200,900",
        ],
      },
    },
    browserDisconnectTimeout: 50000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 6000000,
  });
};
