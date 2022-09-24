import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const widgetName = process.argv[2];
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const widgetsPath = "../src/Features/Widgets";

console.log(filename, "filename");
console.log(dirname, "dirname");
console.log(widgetName, "widgetName");

fs.writeFile(`${widgetsPath}/README.md`, templateReadMeContent, "utf8", function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    displayMessage("README file setup.");
});

const init = () => {};

init();
