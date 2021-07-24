const fs = require("fs");

class ReportGenerator
{
    static writeReport = function(handsOnResult)
    {
        if (fs.existsSync("HandsOnResult.json"))
        {
            fs.unlinkSync("HandsOnResult.json");
        }

        fs.writeFileSync("HandsOnResult.json", JSON.stringify(handsOnResult));
    }
}

module.exports = ReportGenerator;