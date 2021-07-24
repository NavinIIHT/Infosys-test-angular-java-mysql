require("colors");
const ReportGenerator = require('./ReportGenerator');

var VerificationReporter = function()
{
    let testCaseReports;
    let testCaseIDMap = {};

    let browserStarted = false;
    let totalTestCases = 0;

    this.onBrowserStart = function (browser)
    {
        browserStarted = true;
        totalTestCases = browser.lastResult.total;

        testCaseReports = [];
    };

    this.onSpecComplete = function (browser, result)
    {
        if (result.success)
        {
            console.log("\u2713".green, '-', result.suite[0], "-", result.description)
        }
        else
        {
            console.log("\u2717".red, '-', result.suite[0], "-", result.description);
        }

        let testCaseReport = {};

        let suiteName = result.suite[0];
        let suiteNameChunks = suiteName.split(" | ");

        testCaseReport.cadre = suiteNameChunks.shift();
        testCaseReport.group = suiteNameChunks.shift();
        testCaseReport.testClass = suiteNameChunks.shift();
        testCaseReport.testCaseID = this.generateTestCaseID(testCaseReport.cadre, testCaseReport.testClass);

        let specNameChunks = result.description.split(" | ");

        testCaseReport.testCaseName = specNameChunks.shift();

        if (specNameChunks.length > 0)
        {
            testCaseReport.testCaseDescription = specNameChunks.join(" | ");
        }

        testCaseReport.result = result.success ? "Pass" : "Fail";
        
        if (! result.success)
        {
            let failureLogs = result.log[0];

            testCaseReport.reasonForFailure = failureLogs.split("\n").shift();
        }

        testCaseReports.push(testCaseReport);
    };

    this.onRunComplete = function (browsers, result)
    {
        let handsOnResult = {};

        if (!browserStarted && result.exitCode == 1)
        {
            console.log("\nCompilation Error!".red.bold);

            handsOnResult.scriptStatus = "COMPILATION_ERROR";
        }
        else
        {
            console.log("\nExecuted", `${totalTestCases}`.blue, "test cases | Passed:", `${result.success}`.green, "| Failed:", `${result.failed}`.red);

            if (result.error)
            {
                console.log("Runtime error(s) had been encountered, which might have led to incomplete execution!".red.bold);
                
                handsOnResult.scriptStatus = "RUNTIME_ERROR";
            }
            else
            {
                handsOnResult.scriptStatus = "COMPILATION_SUCCESS";
            }

            handsOnResult.testCaseReports = testCaseReports;
        }

        ReportGenerator.writeReport(handsOnResult);
    };

    this.generateTestCaseID = function (cadre, testClass)
    {
        let testCaseID = (cadre == "Structural" ? "STC" : "LTC");
        
        let testCaseIDMapKey = cadre.concat(".").concat(testClass);
        
        if (testCaseIDMap[testCaseIDMapKey] != undefined)
        {
            testCaseIDMap[testCaseIDMapKey] += 1
        }
        else
        {
            testCaseIDMap[testCaseIDMapKey] = 1
        }
        
        testCaseID = testCaseID.concat(testCaseIDMap[testCaseIDMapKey]).concat("-").concat(testClass);

        return testCaseID;
    };
}

module.exports =
{
    'reporter:VerificationReporter': ['type', VerificationReporter]
};